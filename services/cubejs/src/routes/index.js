import express from 'express';
import { ScaffoldingTemplate } from '@cubejs-backend/schema-compiler';

import { findDataSchemas, createDataSchema } from '../utils/dataSourceHelpers.js';
import createMd5Hex from '../utils/md5Hex.js';

const filterFiles = (mainFiles, addFiles) => {
  const fileNames = mainFiles.map(f => f.fileName);
  return [
    ...mainFiles,
    ...addFiles.filter((f) => !fileNames.includes(f.fileName)),
  ];
}

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
      let schema = await driver.tablesSchema();
      const { tables = [], overwrite = false, branchId = 'main', format = 'yaml' } = (req.body || {});

      let normalizedTables = tables.map(table => table?.name?.replace('/', '.'));

      if (dbType === 'questdb') {
        normalizedTables = tables.map(table => (['', table?.name?.replace('/', '')]));
      }

      if (dbType === 'elasticsearch') {
        schema = { '': schema.main };
        normalizedTables = normalizedTables.map(table => ['', table?.replace('main.', '')]);
      }

      if (dbType === 'dremio') {
        normalizedTables = tables.map(table => {
          const parts = table?.name?.split('.');
          return [parts.slice(0, -1).join('.'), parts[parts.length - 1]];
        });
      }

      if (dbType === 'ksql') {
        normalizedTables = tables.map(table => (['', table?.name?.replace('.', '')]));
      }
      
      const scaffoldingTemplate = new ScaffoldingTemplate(schema, driver, { format });
      const newFiles = scaffoldingTemplate.generateFilesByTableNames(normalizedTables);

      if (!newFiles.length) {
        return res.status(400).json({
          code: 'generate_schema_no_new_files',
          message: 'No new files created',
        });
      }

      const dataSchemas = await findDataSchemas({
        branchId,
        authToken,
      });

      const existedFiles = dataSchemas.map(row => ({ fileName: row.name, content: row.code }));

      let files;
      if (overwrite) {
        files = filterFiles(newFiles, existedFiles);
      } else {
        files = filterFiles(existedFiles, newFiles);
      }

      let commitChecksum = files.reduce((acc, cur) => acc + cur.code, '');
      commitChecksum = createMd5Hex(commitChecksum);

      const preparedSchemas = files.map(file => ({
        name: file.fileName,
        code: file.content,
        user_id: userId,
        datasource_id: dataSourceId,
      }));

      const commitObject = {
        user_id: userId,
        branch_id: branchId,
        checksum: commitChecksum,
        dataschemas: {
          data: [...preparedSchemas],
        },
      };

      await createDataSchema(commitObject);

      if (cubejs.compilerCache) {
        cubejs.compilerCache.prune();
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
