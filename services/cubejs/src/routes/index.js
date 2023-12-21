import express from "express";

import getSchema from "./getSchema.js";
import runSql from "./runSql.js";
import testConnection from "./testConnection.js";
import generateDataSchema from "./generateDataSchema.js";
import validateCode from "./validateCode.js";
import preAggregationPreview from "./preAggregationPreview.js";
import preAggregations from "./preAggregations.js";

const router = express.Router();

export default ({ basePath, checkAuth, cubejs }) => {
  router.use(async (req, _, next) => {
    await checkAuth(req);
    next();
  });

  router.post(`${basePath}/v1/runSql`, (req, res) => runSql(req, res, cubejs));
  router.get(`${basePath}/v1/test`, (req, res) =>
    testConnection(req, res, cubejs)
  );

  router.get(`${basePath}/v1/get-schema`, async (req, res) =>
    getSchema(req, res, cubejs)
  );

  router.post(`${basePath}/v1/generate-dataschema`, async (req, res) =>
    generateDataSchema(req, res, cubejs)
  );

  router.post(`${basePath}/v1/validate-code`, async (req, res) =>
    validateCode(req, res, cubejs)
  );

  router.post(`${basePath}/v1/pre-aggregation-preview`, async (req, res) =>
    preAggregationPreview(req, res, cubejs)
  );

  router.get(`${basePath}/v1/pre-aggregations`, async (req, res) =>
    preAggregations(req, res, cubejs)
  );

  return router;
};
