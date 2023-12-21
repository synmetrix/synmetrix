import DriverDependencies from "@cubejs-backend/server-core/dist/src/core/DriverDependencies.js";

const driverError = (err) => {
  console.error("Driver error:");
  console.error(err);

  const throwError = () => {
    throw new Error(err?.message || err);
  };

  return {
    tablesSchema: throwError,
    testConnection: throwError,
  };
};

const connParamValid = (port) => {
  const portValidation = port >= 0 && port < 65536;
  if (!portValidation) {
    throw new Error(`Port should be >= 0 and < 65536. Received ${port}.`);
  }
};

/**
 * Asynchronous function to create a database driver with the given security context.
 *
 * @param {Object} securityContext - The security context object.
 * @param {Object|string} securityContext.dbParams - The parameters for the database connection, either as an object or as a JSON string.
 * @param {string} securityContext.dbType - The type of the database.
 * @param {Error} securityContext.error - Any error that occurred while creating the security context.
 * @returns {Promise} - A promise that resolves to a database driver object.
 *
 * @throws {Error} - Throws an error if the dbParams are not found, incorrect, or of an invalid type, or if the port number is invalid.
 */
const driverFactory = async ({ securityContext }) => {
  const { dbParams, dbType, error: securityError } = securityContext || {};

  if (!dbParams || !Object.keys(dbParams).length) {
    return driverError({
      message: "Datasource credentials not found or incorrect",
    });
  }

  let parsedDbParams = {};

  if (typeof dbParams === "string") {
    try {
      parsedDbParams = JSON.parse(dbParams);
    } catch (err) {
      return driverError(err);
    }
  } else if (typeof dbParams === "object") {
    parsedDbParams = dbParams;
  } else {
    return driverError({
      message: "Invalid dbParams type: expected a string or an object",
    });
  }

  // clean empty/false keys because of sideeffects
  let dbConfig = Object.keys(parsedDbParams || {})
    .filter((key) => !!parsedDbParams[key])
    .reduce((res, key) => ((res[key] = parsedDbParams[key]), res), {});

  try {
    if (dbConfig.port) {
      connParamValid(dbConfig.port);
    }

    if (securityError) {
      throw securityError;
    }
  } catch (err) {
    return driverError(err);
  }

  switch (dbType) {
    case "bigquery":
      let keyFile = {};

      try {
        keyFile = JSON.parse(dbConfig.keyFile);
      } catch (err) {
        return driverError(err);
      }

      dbConfig = {
        ...dbConfig,
        credentials: { ...keyFile },
      };
      break;
    case "mssql":
      dbConfig = {
        ...dbConfig,
        server: dbConfig.host,
        port: parseInt(dbConfig.port) || MSSQL_DEFAULT_PORT,
      };
      break;
    case "clickhouse":
      const auth = [dbConfig.user, dbConfig.password].filter(Boolean).join(":");

      dbConfig = {
        host: dbConfig.host,
        port: dbConfig.port,
        auth,
        protocol: dbConfig.ssl ? "https:" : "http:",
        queryOptions: {
          database: dbConfig.database || "default",
        },
      };
      break;
    case "athena":
      dbConfig = {
        ...dbConfig,
        accessKeyId: dbConfig.awsKey,
        secretAccessKey: dbConfig.awsSecret,
        S3OutputLocation: dbConfig.awsS3OutputLocation,
        region: dbConfig.awsRegion,
      };
      break;
    case "elasticsearch":
      dbConfig = {
        ...dbConfig,
        queryFormat: "json",
        url: dbConfig?.url,
        auth: {
          username: dbConfig?.username,
          password: dbConfig?.password,
        },
      };

      if (dbConfig?.apiId && dbConfig?.apiKey) {
        dbConfig.auth = {
          ...dbConfig.auth,
          apiKey: {
            id: dbConfig?.apiId,
            api_key: dbConfig?.apiKey,
          },
        };
      }
    case "snowflake":
      const account = [dbConfig.orgId, dbConfig.accountId].join("-");

      dbConfig = {
        ...dbConfig,
        account,
      };
      break;
    case "druid":
      dbConfig.url = makeUrl(dbConfig.host, dbConfig.port);
      break;
    case "ksql":
      dbConfig.url = makeUrl(dbConfig.host, dbConfig.port);
      break;
    case "firebolt":
      dbConfig.connection = {
        database: dbConfig?.database,
        username: dbConfig?.username,
        password: dbConfig?.password,
        engineName: dbConfig?.engineName,
      };
      break;
    default:
      break;
  }

  let driverModule;

  try {
    const dbDriver = DriverDependencies[dbType];
    driverModule = await import(dbDriver);

    if (dbType === "druid") {
      driverModule = driverModule.default;
    }

    if (dbType === "databricks-jdbc") {
      return new driverModule.DatabricksDriver(dbConfig);
    }
  } catch (err) {
    return driverError(err);
  }

  const driverClass = new driverModule.default(dbConfig);
  return driverClass;
};

export default driverFactory;
