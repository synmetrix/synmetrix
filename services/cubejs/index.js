import ServerCore from '@cubejs-backend/server-core';
import express from 'express';

import jwt from 'jsonwebtoken';

import DriverDependencies from '@cubejs-backend/server-core/dist/src/core/DriverDependencies.js';

import routes from './src/routes/index.js';
import { 
  dataSchemaFiles,
  findDataSource,
  getDataSources,
  buildSecurityContext,
  findSqlCredentials,
} from './src/utils/dataSourceHelpers.js';

const { 
  CUBEJS_SECRET,
  CUBEJS_SQL_PORT,
  CUBEJS_PG_SQL_PORT,
  CUBEJS_CUBESTORE_PORT,
  CUBEJS_CUBESTORE_HOST,
  CUBEJS_TELEMETRY = false,
} = process.env;

const port = parseInt(process.env.PORT, 10) || 4000;
const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const pushError = (req, error) => {
  req.securityContext = { error };
  return null;
};

const addHttpPrefix = (host) => {
  if (!host.startsWith("http://") && !host.startsWith("https://")) {
    return "http://" + host;
  }
  return host;
};

const setupAuthInfo = async (req, auth) => {
  const { 
    authorization: cubejsAuthToken,
    'x-hasura-authorization': authToken,
  } = req.headers

  let jwtDecoded;
  let error;

  try {
    jwtDecoded = jwt.verify(cubejsAuthToken, CUBEJS_SECRET);
  } catch (err) {
    return pushError(req, err.message);
  }

  const { dataSourceId, userId } = jwtDecoded || {};

  if (!dataSourceId) {
    error = 'Provide dataSourceId';

    return pushError(req, error);
  }

  const dataSource = await findDataSource({ dataSourceId, authToken });

  if (!dataSource?.id) {
    error = `Source "${dataSourceId}" not found`;

    return pushError(req, error);
  }

  const securityContext = buildSecurityContext(dataSource);

  req.securityContext = {
    dataSourceId,
    userId,
    authToken,
    ...securityContext,
  };
};

const connParamValid = (port) => {
  const portValidation = port >= 0 && port < 65536;
  if (!portValidation) {
    throw new Error(`Port should be >= 0 and < 65536. Received ${port}.`);
  }
};

const driverError = (err) => {
  console.error('Driver error:');

  const throwError = () => {
    throw new Error(err?.message || err);
  };

  return {
    tablesSchema: throwError,
    testConnection: throwError,
  };
};

const driverFactory = async ({ securityContext }) => {
  const { dbParams, dbType, error: securityError } = securityContext || {};

  if (!dbParams || !Object.keys(dbParams).length) {
    return driverError({
      message: 'Datasource credentials not found or incorrect',
    });
  }

  let parsedDbParams = {};

  try {
    parsedDbParams = JSON.parse(dbParams);
  } catch (err) {
    return driverError(err);
  }

  // clean empty/false keys because of sideeffects
  let dbConfig = Object.keys(parsedDbParams || {})
    .filter(key => !!parsedDbParams[key])
    .reduce((res, key) => (res[key] = parsedDbParams[key], res), {});

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
    case 'bigquery':
      let keyFile = {};

      try {
        keyFile = JSON.parse(dbConfig.keyFile);
      } catch (err) {
        return driverError(err);
      }

      dbConfig = {
        ...dbConfig,
        credentials: { ...keyFile }
      };
      break;
    case 'mssql':
      dbConfig = {
        ...dbConfig,
        server: dbConfig.host,
        port: parseInt(dbConfig.port) || MSSQL_DEFAULT_PORT
      };
      break;
    case 'clickhouse':
      const auth = [dbConfig.user, dbConfig.password].filter(Boolean).join(':');

      dbConfig = {
        host: dbConfig.host,
        port: dbConfig.port,
        auth,
        protocol: dbConfig.ssl ? 'https:' : 'http:',
        queryOptions: {
          database: dbConfig.database || 'default',
        },
      };
      break;
    case 'athena':
      dbConfig = {
        ...dbConfig,
        accessKeyId: dbConfig.awsKey,
        secretAccessKey: dbConfig.awsSecret,
        S3OutputLocation: dbConfig.awsS3OutputLocation,
        region: dbConfig.awsRegion,
      };
      break;
    case 'snowflake':
      const account = [dbConfig.orgId, dbConfig.accountId].join('-');

      dbConfig = {
        ...dbConfig,
        account,
      };
      break;
    case 'druid':
      dbConfig.host = addHttpPrefix(dbConfig.host);
      const url = [dbConfig.host, dbConfig.port].join(':');

      dbConfig = {
        ...dbConfig,
        url,
      };
      break;
    default:
      break;
  }

  let driverModule;

  try {
    const dbDriver = DriverDependencies[dbType];
    driverModule = await import(dbDriver);

    if (dbType === 'druid') {
      driverModule = driverModule.default;
    }
  } catch (err) {
    return driverError(err);
  }

  const driverClass = new driverModule.default(dbConfig);
  return driverClass;
};

const dbType = ({ securityContext }) => {
  return securityContext?.dbType || 'none';
};

const scheduledRefreshContexts = async () => {
  const dataSources = await getDataSources();

  return (dataSources || []).map(dataSource => {
    return {
      securityContext: buildSecurityContext(dataSource),
    };
  });
};

const basePath = `/cubejs/datasources`;

const options = {
  contextToAppId: ({ securityContext }) => `CUBEJS_APP_${securityContext?.dataSourceVersion}`,
  contextToOrchestratorId: ({ securityContext }) => `CUBEJS_APP_${securityContext?.dataSourceVersion}`,
  dbType,
  devServer: false,
  checkAuth: setupAuthInfo,
  apiSecret: CUBEJS_SECRET,
  basePath,
  schemaVersion: ({ securityContext }) => securityContext?.schemaVersion,
  driverFactory,
  repositoryFactory: ({ securityContext }) => {
    const { dataSourceId, authToken } = securityContext || {};

    return {
      dataSchemaFiles: () => dataSchemaFiles({ dataSourceId, authToken }),
    };
  },
  preAggregationsSchema: ({ securityContext }) => `pre_aggregations_${securityContext?.dataSourceVersion}`,
  telemetry: CUBEJS_TELEMETRY,
  scheduledRefreshTimer: 60,
  scheduledRefreshContexts,
  externalDbType: 'cubestore',
  externalDriverFactory: async () => ServerCore.createDriver('cubestore', {
    host: CUBEJS_CUBESTORE_HOST,
    port: CUBEJS_CUBESTORE_PORT
  }),
  cacheAndQueueDriver: 'cubestore',

  // sql server
  pgSqlPort: parseInt(CUBEJS_PG_SQL_PORT, 10),
  sqlPort: parseInt(CUBEJS_SQL_PORT, 10),
  canSwitchSqlUser: () => false,
  checkSqlAuth: async (req, user) => {
    const sqlCredentials = await findSqlCredentials(user);

    if (!sqlCredentials) {
      throw new Error('Incorrect user name or password');
    }

    const securityContext = buildSecurityContext(sqlCredentials.datasource);

    return {
      password: sqlCredentials.password,
      securityContext,
    };
  },
};

const cubejs = new ServerCore(options);

app.use(routes({ basePath, setupAuthInfo, cubejs }));

cubejs.initApp(app);

const sqlServer = cubejs.initSQLServer();
sqlServer.init(options);

app.listen(port);