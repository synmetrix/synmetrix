import express from "express";

import checkAuthMiddleware from "../utils/checkAuth.js";
import generateDataSchema from "./generateDataSchema.js";
import getSchema from "./getSchema.js";
import preAggregationPreview from "./preAggregationPreview.js";
import preAggregations from "./preAggregations.js";
import runSql from "./runSql.js";
import testConnection from "./testConnection.js";

const router = express.Router();

export default ({ basePath, cubejs }) => {
  router.post(`${basePath}/v1/run-sql`, checkAuthMiddleware, (req, res) =>
    runSql(req, res, cubejs)
  );
  router.get(`${basePath}/v1/test`, checkAuthMiddleware, (req, res) =>
    testConnection(req, res, cubejs)
  );

  router.get(
    `${basePath}/v1/get-schema`,
    checkAuthMiddleware,
    async (req, res) => getSchema(req, res, cubejs)
  );

  router.post(
    `${basePath}/v1/generate-models`,
    checkAuthMiddleware,
    async (req, res) => generateDataSchema(req, res, cubejs)
  );

  router.post(
    `${basePath}/v1/pre-aggregation-preview`,
    checkAuthMiddleware,
    async (req, res) => preAggregationPreview(req, res, cubejs)
  );

  router.get(
    `${basePath}/v1/pre-aggregations`,
    checkAuthMiddleware,
    async (req, res) => preAggregations(req, res, cubejs)
  );

  return router;
};
