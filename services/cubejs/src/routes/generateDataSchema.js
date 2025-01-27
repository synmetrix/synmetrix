import { ScaffoldingTemplate } from "@cubejs-backend/schema-compiler";
import {
  createDataSchema,
  findDataSchemas,
} from "../utils/dataSourceHelpers.js";
import createMd5Hex from "../utils/md5Hex.js";
import { NO_SCHEMA_KEY } from "./getSchema.js";
const filterFiles = (mainFiles, addFiles) => {
  const fileNames = mainFiles.map((f) => f.fileName);
  return [
    ...mainFiles,
    ...addFiles.filter((f) => !fileNames.includes(f.fileName)),
  ];
};

const normalizeTables = (schema, tables) => {
  const normalizedSchema = { ...schema };

  if (normalizedSchema?.[NO_SCHEMA_KEY]) {
    normalizedSchema[""] = normalizedSchema[NO_SCHEMA_KEY];
    delete normalizedSchema[NO_SCHEMA_KEY];
  }

  let normalizedTables = tables.map((table) => [
    table?.schema !== NO_SCHEMA_KEY ? table?.schema.replace("/", ".") : "",
    table?.name,
  ]);

  return {
    tables: normalizedTables,
    schema: normalizedSchema,
  };
};

export default async (req, res, cubejs) => {
  const { securityContext } = req;
  const { userScope, userId, authToken } = securityContext;
  const { dataSourceId } = userScope.dataSource;

  const driver = await cubejs.options.driverFactory({ securityContext });

  try {
    let schema = await driver.tablesSchema();
    const {
      tables = [],
      overwrite = false,
      branchId,
      format = "yaml",
    } = req.body || {};

    const { tables: normalizedTables, schema: normalizedSchema } =
      normalizeTables(schema, tables);

    const scaffoldingTemplate = new ScaffoldingTemplate(
      normalizedSchema,
      driver,
      {
        format,
      }
    );

    const newFiles =
      scaffoldingTemplate.generateFilesByTableNames(normalizedTables);

    if (!newFiles.length) {
      return res.status(400).json({
        code: "generate_schema_no_new_files",
        message: "No new files created",
      });
    }

    const dataSchemas = await findDataSchemas({
      dataSourceId,
      branchId,
      authToken,
    });

    const existedFiles = dataSchemas.map((row) => ({
      fileName: row.name,
      content: row.code,
    }));

    let files;
    if (overwrite) {
      files = filterFiles(newFiles, existedFiles);
    } else {
      files = filterFiles(existedFiles, newFiles);
    }

    let commitChecksum = files.reduce((acc, cur) => acc + cur.code, "");
    commitChecksum = createMd5Hex(commitChecksum);

    const preparedSchemas = files.map((file) => ({
      name: file.fileName,
      code: file.content,
      user_id: userId,
      datasource_id: dataSourceId,
    }));

    const commitObject = {
      authToken,
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

    res.json({ code: "ok", message: "Generation finished" });
  } catch (err) {
    console.error(err);

    if (driver.release) {
      await driver.release();
    }

    res.status(500).json({
      code: "generate_schema_error",
      message: err.message || err,
    });
  }
};
