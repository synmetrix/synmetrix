import ServerCore from '@cubejs-backend/server-core';
import express from 'express';

import jwt from 'jsonwebtoken';
import JSum from 'jsum';

import DriverDependencies from '@cubejs-backend/server-core/dist/src/core/DriverDependencies.js';

import routes from './src/routes/index.js';
import { fetchGraphQL } from './src/utils/graphql.js';
import { dataSchemaFiles, findDataSource, getSchemaVersion } from './src/utils/dataSourceHelpers.js';

const { CUBEJS_SECRET } = process.env;

const port = parseInt(process.env.PORT, 10) || 4000;
const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const pushError = (req, error) => {
  req.securityContext = { error };
  return null;
};

const setupAuthInfo = async (req, auth) => {
  const { 
    authorization: cubejsAuthToken,
    'x-hasura-authorization': authToken,
  } = req.headers;

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

  if (!dataSource) {
    error = `Source "${dataSourceId}" not found`;

    return pushError(req, error);
  }

  const schemaVersion = await getSchemaVersion({ dataSourceId, authToken });
  const dataSourceVersion = JSum.digest(dataSource, 'SHA256', 'hex');
  const dbType = dataSource.db_type?.toLowerCase();

  req.securityContext = {
    dataSourceId,
    userId,
    dataSource,
    dbType,
    schemaVersion,
    dataSourceVersion,
    authToken,
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
  const { dataSource, dbType, error: securityError } = securityContext || {};

  let dbParams = {};

  if (!dataSource || !Object.keys(dataSource).length) {
    return driverError({
      message: 'Datasource not found',
    });
  }

  try {
    dbParams = JSON.parse(dataSource?.db_params);
  } catch (err) {
    return driverError(err);
  }

  // clean empty/false keys because of sideeffects
  let dbConfig = Object.keys(dbParams || {})
    .filter(key => !!dbParams[key])
    .reduce((res, key) => (res[key] = dbParams[key], res), {});

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
    default:
      break;
  }

  let driverModule;

  try {
    const dbDriver = DriverDependencies[dbType];
    driverModule = await import(dbDriver);
  } catch (err) {
    return driverError(err);
  }

  const driverClass = new driverModule.default(dbConfig);
  return driverClass;
};

const dbType = ({ securityContext }) => {
  const { dataSource = {} } = securityContext || {};
  return dataSource.db_type?.toLowerCase() || 'none';
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
  schemaVersion: ({ securityContext }) => securityContext?.schemaVersion,
  driverFactory,
  repositoryFactory: ({ securityContext }) => {
    const { dataSourceId, authToken } = securityContext || {};

    return {
      dataSchemaFiles: () => dataSchemaFiles({ dataSourceId, authToken }),
    };
  },
  telemetry: false,
  scheduledRefreshTimer: 600, // TODO: install securityContexts for the refresh
  orchestratorOptions: {
    queryCacheOptions: {
      refreshKeyRenewalThreshold: 45,
      backgroundRenew: false,
    },
  },
};

const cubejs = new ServerCore(options);

app.use(routes({ basePath, setupAuthInfo, cubejs }));

cubejs.initApp(app);
app.listen(port);
