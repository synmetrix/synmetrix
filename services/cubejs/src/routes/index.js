const inflection = require('inflection');
const express = require('express');

const router = express.Router();
const { updateJoins } = require('../utils/compiler');
const { findDataSchemas, createDataSchema } = require('../utils/dataSourceHelpers');

const routes = ({ basePath, setupAuthInfo, cubejs }) => {
  router.use(async (req, res, next) => {
    await setupAuthInfo(req);
    next();
  });

  // endpoint for sql runner
  router.post(`${basePath}/v1/runSql`, async (req, res) => {
    const { securityContext } = req;
    const driver = cubejs.options.driverFactory({ securityContext });

    try {
      const rows = await driver.query(req.body.query);
      res.json(rows);
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  });

  router.get(`${basePath}/v1/test`, async (req, res) => {
    const { securityContext } = req;
    const driver = cubejs.options.driverFactory({ securityContext });

    try {
      await driver.testConnection();

      res.json({
        code: 'ok',
        message: 'Connection is OK',
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        code: 'connection_test_failed',
        message: err.message
      });
    }
  });

  router.get(`${basePath}/v1/get-schema`, async (req, res) => {
    const { securityContext } = req;
    const driver = cubejs.options.driverFactory({ securityContext });

    try {
      const schema = await driver.tablesSchema();
      res.json(schema);
    } catch (err) {
      if (driver.release) {
        await driver.release();
      }

      res.status(500).json({
        error: err.message
      });
    }
  });

  router.post(`${basePath}/v1/generate-dataschema`, async (req, res) => {
    const { securityContext } = req;
    const { dataSource, user } = securityContext;

    const driver = cubejs.options.driverFactory({ securityContext });

    try {
      const schema = await driver.tablesSchema();
      const { tables = [], overWrite = false } = (req.body || {});

      const ScaffoldingTemplate = await require('@cubejs-backend/schema-compiler/scaffolding/ScaffoldingTemplate.js');
      const scaffoldingTemplate = new ScaffoldingTemplate(
        schema,
        driver,
      );

      const files = scaffoldingTemplate.generateFilesByTableDefinitions(
        tables,
      );

      const dataSchemas = await findDataSchemas({
        dataSourceId: dataSource.id,
      });

      const existedFiles = dataSchemas.map(row => row.name);

      const schemaUpdateQueries = files.map(file => createDataSchema({
        datasource_id: dataSource.id,
        name: file.fileName,
        code: file.content,
        user_id: user.id,
      }));

      if (schemaUpdateQueries.length) {
        await Promise.all(schemaUpdateQueries);
        await updateJoins({ dataSource, files, relations: tables, scaffoldingTemplate }, context);
      }

      if (cubejs.compilerCache) {
        cubejs.compilerCache.prune();
      }

      res.json({ code: 'ok', message: 'Generation finished' });
    } catch (err) {
      if (driver.release) {
        await driver.release();
      }

      res.status(500).json({
        code: 'generate_schema_error',
        message: err.message
      });
    }
  });

  router.post(`${basePath}/v1/validate-code`, async (req, res) => {
    try {
      if (cubejs.compilerCache) {
        cubejs.compilerCache.prune();
      }
    } catch (err) {
      res.status(500).json({
        code: 'code_validation_error',
        message: err.message
      });
    }

    const compilerApi = await cubejs.getCompilerApi(req);

    try {
      await compilerApi.metaConfig();
      res.json({ code: 'ok', message: 'Validation is OK' });
    } catch (error) {
      const { messages } = error;
      res.json({ code: 'code_validation_error', message: messages });
    }
  });

  return router;
};

module.exports = routes;
