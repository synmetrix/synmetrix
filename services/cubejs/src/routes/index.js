const inflection = require('inflection');
const express = require('express');

const router = express.Router();
const { updateJoins } = require('../utils/compiler');

const routes = ({ basePath, setupAuthInfo, cubejs, context }) => {
  const { pgClient } = context;

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
        message: 'OK',
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
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

      // console.error(err);
      res.status(500).json({
        error: err.message
      });
    }
  });

  router.post(`${basePath}/v1/generate-dataschema`, async (req, res) => {
    const { securityContext } = req;
    const { dataSource } = securityContext;

    const driver = cubejs.options.driverFactory({ securityContext });

    try {
      const schema = await driver.tablesSchema();
      const { tables = [], overWrite = false } = (req.body || {});

      const ScaffoldingTemplate = await require('../schema-compiler/scaffolding/ScaffoldingTemplate');
      const scaffoldingTemplate = new ScaffoldingTemplate(
        schema,
        driver,
      );

      const files = scaffoldingTemplate.generateFilesByTableDefinitions(
        tables,
      );

      const { rows: dataschemas } = await pgClient.query(
        'SELECT name FROM public.dataschemas WHERE datasource_id=$1',
        [dataSource.id]
      );

      const existedFiles = dataschemas.map(row => row.name);

      const schemaUpdateQueries = files.map(file => {
        if (!existedFiles.includes(file.fileName)) {
          return pgClient.query(
            'INSERT INTO public.dataschemas(datasource_id, name, code, user_id) VALUES ($1, $2, $3, $4)',
            [dataSource.id, file.fileName, file.content, dataSource.user_id]
          );
        } else if (overWrite) {
          return pgClient.query(
            'UPDATE public.dataschemas SET code = $1 WHERE datasource_id = $2 AND name = $3',
            [file.content, dataSource.id, file.fileName]
          );
        }
      });

      if (schemaUpdateQueries.length) {
        await Promise.all(schemaUpdateQueries);
        await updateJoins({ dataSource, files, relations: tables, scaffoldingTemplate }, context);
      }

      if (cubejs.compilerCache) {
        cubejs.compilerCache.prune();
      }

      res.json({ status: 'ok' });
    } catch (err) {
      if (driver.release) {
        await driver.release();
      }

      // console.error(err);
      res.status(500).json({
        error: err.message
      });
    }
  });

  router.post(`${basePath}/v1/validate-code`, async (req, res) => {
    try {
      if (cubejs.compilerCache) {
        cubejs.compilerCache.prune();
      }
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    const compilerApi = await cubejs.getCompilerApi(req);

    try {
      await compilerApi.metaConfig();
      res.json({ status: 'ok' });
    } catch (error) {
      const { messages } = error;
      res.json({ status: 'err', messages });
    }
  });

  return router;
};

module.exports = routes;
