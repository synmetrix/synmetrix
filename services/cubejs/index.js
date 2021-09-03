const ServerCore = require('@cubejs-backend/server-core');
const pgConnectionString = require('pg-connection-string');
const express = require('express');

const jwt = require('jsonwebtoken');

const PostgresDriver = require('@cubejs-backend/postgres-driver');
const AthenaDriver = require('@cubejs-backend/athena-driver');
const BigQueryDriver = require('@cubejs-backend/bigquery-driver');
const ClickHouseDriver = require('@cubejs-backend/clickhouse-driver');
const MongobiDriver = require('@cubejs-backend/mongobi-driver');
const MSSqlDriver = require('@cubejs-backend/mssql-driver');
const MySqlDriver = require('@cubejs-backend/mysql-driver');
const JSum = require('jsum');

const routes = require('./src/routes');
const { fetchGraphQL } = require('./src/utils/graphql');
const { dataSchemaFiles, findDataSource, getSchemaVersion } = require('./src/utils/dataSourceHelpers');

const { CUBEJS_SECRET } = process.env;
const MSSQL_DEFAULT_PORT = 1433;

const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const logger = (msg, params) => {
  const { queryKey, query, securityContext, cacheKey, sqlQuery, ...restParams } = params;
  console.log(`${msg}: ${JSON.stringify(restParams)}`);
};

const pushError = (req, error) => {
  req.securityContext = { error };
  return null;
};

const setupAuthInfo = async (req, auth) => {
  const { authorization } = req.headers;
  let jwtDecoded;
  let error;

  try {
    jwtDecoded = jwt.verify(authorization, CUBEJS_SECRET);
  } catch (err) {
    return pushError(req, err.message);
  }

  const { dataSourceId } = jwtDecoded || {};

  if (!dataSourceId) {
    error = 'Provide dataSourceId';

    return pushError(req, error);
  }

  const dataSource = await findDataSource({ dataSourceId });

  if (!dataSource) {
    error = `Source "${dataSourceId}" not found`;

    return pushError(req, error);
  }

  const schemaVersion = await getSchemaVersion({ dataSourceId });
  const dataSourceVersion = JSum.digest(dataSource, 'SHA256', 'hex');

  req.securityContext = { dataSourceId, dataSource, schemaVersion, dataSourceVersion };
};

const connParamValid = (port) => {
  const portValidation = port >= 0 && port < 65536;
  if (!portValidation) {
    throw new Error(`Port should be >= 0 and < 65536. Received ${port}.`);
  }
};

const driverFactory = ({ securityContext }) => {
  const { dataSource, error: securityError } = securityContext || {};

  if (securityError) {
    const throwSecurityError = () => {
      throw new Error(securityError);
    };

    return {
      tablesSchema: throwSecurityError,
      testConnection: throwSecurityError,
    }
  }

  let result;
  let error;

  // clean empty/false keys because of sideeffects
  let dbConfig = Object.keys(dataSource.db_params || {})
    .filter(key => !!dataSource.db_params[key])
    .reduce((res, key) => (res[key] = dataSource.db_params[key], res), {});

  try {
    if (dbConfig.port) {
      connParamValid(dbConfig.port);
    }

    const dbType = dataSource.db_type?.toUpperCase();

    if (['REDSHIFT', 'POSTGRES'].includes(dbType)) {
      if (dbConfig.connection_string) {
        dbConfig = pgConnectionString(dbConfig.connection_string);
      }

      result = new PostgresDriver(dbConfig);
    }

    switch (dbType) {
      case 'MYSQL':
        result = new MySqlDriver(dbConfig);
        break;
      case 'ATHENA':
        result = new AthenaDriver(dbConfig);
        break;
      case 'MONGOBI':
        result = new MongobiDriver(dbConfig);
        break;
      case 'BIGQUERY':
        result = new BigQueryDriver({
          ...dbConfig,
          credentials: { ...dbConfig.keyFile }
        });
        break;
      case 'MSSQL':
        result = new MSSqlDriver({
          ...dbConfig,
          server: dbConfig.host,
          port: parseInt(dbConfig.port) || MSSQL_DEFAULT_PORT
        });
        break;
      case 'CLICKHOUSE':
        result = new ClickHouseDriver({
          host: dbConfig.host,
          port: dbConfig.port,
          auth: `${dbConfig.user}:${dbConfig.password}`,
          protocol: dbConfig.ssl ? 'https:' : 'http:',
          queryOptions: {
            database: dbConfig.database || 'default'
          },
        });
        break;
      default:
        break;
    }

  } catch (err) {
    console.error(err);
    error = err.message;
  }

  if (error) {
    const throwError = () => {
      throw new Error(error);
    };

    return {
      tablesSchema: throwError,
      testConnection: throwError,
    };
  }

  console.log(result);

  return result;
};

const dbType = ({ securityContext }) => {
  const { dataSource = {} } = securityContext || {};
  return dataSource.db_type || 'none';
};

const basePath = `/cubejs/datasources`;

const options = {
  contextToAppId: (props) => {
    const { securityContext } = props;
    const { dataSourceVersion } = securityContext || {};

    if (dataSourceVersion) {
      return `CUBEJS_APP_${dataSourceVersion}`
    }

    return 'CUBEJS_APP';
    // throw 'dataSourceVersion not found';
  },
  dbType,
  devServer: false,
  checkAuth: setupAuthInfo,
  apiSecret: CUBEJS_SECRET,
  basePath,
  logger,
  schemaVersion: ({ securityContext }) => securityContext?.schemaVersion,
  driverFactory,
  repositoryFactory: ({ securityContext }) => {
    const { dataSourceId } = securityContext || {};

    return {
      dataSchemaFiles: () => dataSchemaFiles({ dataSourceId }),
    };
  },
  telemetry: false,
  orchestratorOptions: {
    queryCacheOptions: {
      renewalThreshold: 60,
      refreshKeyRenewalThreshold: 45,
      backgroundRenew: false,
    },
  },
};

const cubejs = new ServerCore(options);

app.use(routes({ basePath, setupAuthInfo, cubejs }));

cubejs.initApp(app);
app.listen(4000);
