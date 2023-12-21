import ServerCore from "@cubejs-backend/server-core";
import express from "express";

import routes from "./src/routes/index.js";
import { logging } from "./src/utils/logging.js";

import driverFactory from "./src/utils/driverFactory.js";
import queryRewrite from "./src/utils/queryRewrite.js";
import checkSqlAuth from "./src/utils/checkSqlAuth.js";
import checkAuth from "./src/utils/checkAuth.js";
import scheduledRefreshContexts from "./src/utils/scheduledRefreshContexts.js";
import repositoryFactory from "./src/utils/repositoryFactory.js";

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

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const dbType = ({ securityContext }) => securityContext?.dbType || "none";
const contextToOrchestratorId = ({ securityContext }) =>
  `CUBEJS_APP_${securityContext?.dataSourceVersion}`;

const contextToAppId = ({ securityContext }) =>
  `CUBEJS_APP_${securityContext?.dataSourceVersion}`;

const schemaVersion = ({ securityContext }) => securityContext?.schemaVersion;
const preAggregationsSchema = ({ securityContext }) =>
  `pre_aggregations_${securityContext?.dataSourceVersion}`;

const externalDriverFactory = async () =>
  ServerCore.createDriver("cubestore", {
    host: CUBEJS_CUBESTORE_HOST,
    port: CUBEJS_CUBESTORE_PORT,
  });

const basePath = `/cubejs/datasources`;

const options = {
  queryRewrite,
  contextToAppId,
  contextToOrchestratorId,
  dbType,
  devServer: false,
  checkAuth,
  apiSecret: CUBEJS_SECRET,
  basePath,
  schemaVersion,
  driverFactory,
  repositoryFactory,
  preAggregationsSchema,
  telemetry: CUBEJS_TELEMETRY,
  scheduledRefreshTimer: 60,
  scheduledRefreshContexts,
  externalDbType: "cubestore",
  externalDriverFactory,
  cacheAndQueueDriver: "cubestore",
  logger: logging,

  // sql server
  pgSqlPort: parseInt(CUBEJS_PG_SQL_PORT, 10),
  sqlPort: parseInt(CUBEJS_SQL_PORT, 10),
  canSwitchSqlUser: () => false,
  checkSqlAuth,
};

const cubejs = new ServerCore(options);

app.use(routes({ basePath, checkAuth, cubejs }));

cubejs.initApp(app);

const sqlServer = cubejs.initSQLServer();
sqlServer.init(options);

app.listen(port);
