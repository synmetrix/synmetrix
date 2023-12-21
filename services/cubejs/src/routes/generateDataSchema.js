import { ScaffoldingTemplate } from "@cubejs-backend/schema-compiler";
import {
  findDataSchemas,
  createDataSchema,
} from "../utils/dataSourceHelpers.js";
import createMd5Hex from "../utils/md5Hex.js";

const filterFiles = (mainFiles, addFiles) => {
  const fileNames = mainFiles.map((f) => f.fileName);
  return [
    ...mainFiles,
    ...addFiles.filter((f) => !fileNames.includes(f.fileName)),
  ];
};

const normalizeTables = (schema, tables, dbType) => {
  let normalizedTables = tables.map((table) => table?.name?.replace("/", "."));

  if (dbType === "questdb") {
    normalizedTables = tables.map((table) => [
      "",
      table?.name?.replace("/", ""),
    ]);
  }

  if (dbType === "elasticsearch") {
    schema = { "": schema.main };
    normalizedTables = normalizedTables.map((table) => [
      "",
      table?.replace("main.", ""),
    ]);
  }

  if (dbType === "dremio") {
    normalizedTables = tables.map((table) => {
      const parts = table?.name?.split(".");
      return [parts.slice(0, -1).join("."), parts[parts.length - 1]];
    });
  }

  if (dbType === "ksql") {
    normalizedTables = tables.map((table) => [
      "",
      table?.name?.replace(".", ""),
    ]);
  }

  return {
    tables: normalizedTables,
    schema,
  };
};

export default async (req, res, cubejs) => {
  const { securityContext } = req;
  const { dataSourceId, userId, dbType, authToken } = securityContext;

  const driver = await cubejs.options.driverFactory({ securityContext });

  try {
    let schema = await driver.tablesSchema();
    const {
      tables = [],
      overwrite = false,
      branchId = "main",
      format = "yaml",
    } = req.body || {};

    const { tables: normalizedTables, schema: normalizedSchema } =
      normalizeTables(schema, tables, dbType);

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
