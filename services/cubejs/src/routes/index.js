import express from 'express';

import { findDataSchemas, createDataSchema } from '../utils/dataSourceHelpers.js';

const ADAPTERS = {
  postgres: 'postgres',
  redshift: 'redshift',
  mysql: 'mysql',
  mysqlauroraserverless: 'mysql',
  mongobi: 'mongobi',
  mssql: 'mssql',
  bigquery: 'bigquery',
  prestodb: 'prestodb',
  qubole_prestodb: 'qubolePrestodb',
  athena: 'prestodb',
  vertica: 'vertica',
  snowflake: 'snowflake',
  clickhouse: 'clickhouse',
  hive: 'hive',
  oracle: 'oracle',
  sqlite: 'sqlite',
  awselasticsearch: 'awselasticsearch',
  elasticsearch: 'elasticsearch',
};

const router = express.Router();
export default ({ basePath, setupAuthInfo, cubejs }) => {
  router.use(async (req, res, next) => {
    await setupAuthInfo(req);
    next();
  });

  // endpoint for sql runner
  router.post(`${basePath}/v1/runSql`, async (req, res) => {
    const { securityContext } = req;
    const driver = await cubejs.options.driverFactory({ securityContext });

    try {
      const rows = await driver.query(req.body.query);
      res.json(rows);
    } catch (err) {
      console.error(err);

      res.status(500).json({
        code: 'run_sql_failed',
        message: err.message || err,
      });
    }
  });

  router.get(`${basePath}/v1/test`, async (req, res) => {
    const { securityContext } = req;
    const driver = await cubejs.options.driverFactory({ securityContext });

    try {
      await driver.testConnection();

      res.json({
        code: 'ok',
        message: 'Connection is OK',
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        code: 'connection_test_failed',
        message: err.message || err,
      });
    }
  });

  router.get(`${basePath}/v1/get-schema`, async (req, res) => {
    const { securityContext } = req;
    const driver = await cubejs.options.driverFactory({ securityContext });

    try {
      const schema = await driver.tablesSchema();
      res.json(schema);
    } catch (err) {
      console.error(err);

      if (driver.release) {
        await driver.release();
      }

      res.status(500).json({
        code: 'get_schema_failed',
        message: err.message
      });
    }
  });

  router.post(`${basePath}/v1/generate-dataschema`, async (req, res) => {
    const { securityContext } = req;
    const { dataSourceId, userId, dbType, authToken } = securityContext;

    const driver = await cubejs.options.driverFactory({ securityContext });

    try {
      const schema = await driver.tablesSchema();
      const { tables = [], overwrite = false, branch } = (req.body || {});

      const scaffoldingTemplateModule = await import('../schema_compiler/scaffolding/ScaffoldingTemplate.js');
      const dialectType = ADAPTERS[dbType];

      const dialectModule = await import(`../schema_compiler/scaffolding/dialect/${dialectType}.js`);

      const scaffoldingTemplate = new scaffoldingTemplateModule.default(schema, driver);
      const normalizedTables = tables.map(table => table?.name?.replace('/', '.'));

      let files = scaffoldingTemplate.generateFilesByTableNames(normalizedTables, { dbType, dialect: dialectModule });

      const dataSchemas = await findDataSchemas({
        dataSourceId,
        branch,
        authToken,
      });

      const existedFiles = dataSchemas.map(row => row.name);

      const filteredFiles = files.reduce((acc, file) => {
        // if we don't want to overwrite existed schemas
        if (!overwrite && existedFiles.includes(file.fileName)) {
          return acc;
        }

        return [...acc, file];
      }, []);

      const schemaUpdateQueries = filteredFiles.map(file => createDataSchema({
        datasource_id: dataSourceId,
        name: file.fileName,
        code: file.content,
        user_id: userId,
      }, authToken));

      if (schemaUpdateQueries.length) {
        await Promise.all(schemaUpdateQueries);
      }

      if (cubejs.compilerCache) {
        cubejs.compilerCache.prune();
      }

      if (!files.length) {
        return res.status(400).json({
          code: 'generate_schema_no_new_files',
          message: 'No new files created',
        });
      }

      res.json({ code: 'ok', message: 'Generation finished' });
    } catch (err) {
      console.error(err);

      if (driver.release) {
        await driver.release();
      }

      res.status(500).json({
        code: 'generate_schema_error',
        message: err.message || err,
      });
    }
  });

  router.post(`${basePath}/v1/validate-code`, async (req, res) => {
    try {
      if (cubejs.compilerCache) {
        cubejs.compilerCache.prune();
      }
    } catch (err) {
      console.error(err);

      res.status(500).json({
        code: 'code_compilation_error',
        message: err.message
      });
    }

    const compilerApi = await cubejs.getCompilerApi(req);

    try {
      await compilerApi.metaConfig();
      res.json({ code: 'ok', message: 'Validation is OK' });
    } catch (err) {
      console.error(err);

      const { messages } = err;
      res.status(500).json({ code: 'code_validation_error', message: messages?.toString() });
    }
  });

  return router;
};
