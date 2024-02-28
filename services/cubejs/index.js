import ServerCore from "@cubejs-backend/server-core";
import express from "express";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

import routes from "./src/routes/index.js";
import { logging } from "./src/utils/logging.js";

import { checkAuth } from "./src/utils/checkAuth.js";
import checkSqlAuth from "./src/utils/checkSqlAuth.js";
import driverFactory from "./src/utils/driverFactory.js";
import queryRewrite from "./src/utils/queryRewrite.js";
import repositoryFactory from "./src/utils/repositoryFactory.js";
import scheduledRefreshContexts from "./src/utils/scheduledRefreshContexts.js";

const {
  CUBEJS_SECRET,
  CUBEJS_SQL_PORT,
  CUBEJS_PG_SQL_PORT,
  CUBEJS_CUBESTORE_PORT,
  CUBEJS_CUBESTORE_HOST,
  CUBEJS_TELEMETRY = false,
  CUBEJS_SCHEDULED_REFRESH = true,
  CUBEJS_REFRESH_TIMER = 60,
  CUBEJS_SQL_API = true,
} = process.env;

const port = parseInt(process.env.PORT, 10) || 4000;
const app = express();

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const dbType = ({ securityContext }) =>
  securityContext?.userScope?.dataSource?.dbType || "none";
const contextToOrchestratorId = ({ securityContext }) =>
  `CUBEJS_APP_${securityContext?.userScope?.dataSource?.dataSourceVersion}_${securityContext?.userScope?.dataSource?.schemaVersion}}`;

const contextToAppId = ({ securityContext }) =>
  `CUBEJS_APP_${securityContext?.userScope?.dataSource?.dataSourceVersion}_${securityContext?.userScope?.dataSource?.schemaVersion}}`;

const schemaVersion = ({ securityContext }) =>
  securityContext?.userScope?.dataSource?.schemaVersion;

const preAggregationsSchema = ({ securityContext }) =>
  `pre_aggregations_${securityContext?.userScope?.dataSource?.preAggregationSchema}`;

const externalDriverFactory = async () =>
  ServerCore.createDriver("cubestore", {
    host: CUBEJS_CUBESTORE_HOST,
    port: CUBEJS_CUBESTORE_PORT,
  });

const basePath = `/api`;

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
  scheduledRefreshTimer:
    String(CUBEJS_SCHEDULED_REFRESH) !== "false"
      ? parseInt(CUBEJS_REFRESH_TIMER, 10)
      : undefined,
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

const file = fs.readFileSync("./src/swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes({ basePath, cubejs }));

cubejs.initApp(app);

if (String(CUBEJS_SQL_API) === "true") {
  const sqlServer = cubejs.initSQLServer();
  sqlServer.init(options);
}

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send(err.message);
});

app.listen(port);
