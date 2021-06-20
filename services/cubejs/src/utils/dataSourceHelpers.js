const createMd5Hex = require('./md5Hex');

const findDataSource = async ({ dataSourceId }, { pgClient }) => {
  const { rows: [dataSource] } = await pgClient.query(
    'SELECT * FROM public.datasources WHERE id=$1 LIMIT 1', [dataSourceId]
  );

  return dataSource;
};

exports.findDataSource = findDataSource;

const findDataSchemas = async ({ dataSourceId }, { pgClient }) => {
  const { rows } = await pgClient.query(
    'select * from public.dataschemas WHERE datasource_id = $1',
    [dataSourceId]
  );

  return rows;
};

exports.findDataSchemas = findDataSchemas;

const dataSchemaFiles = async (args, context) => {
  const schemas = await findDataSchemas(args, context);

  return schemas.map(r => ({
    fileName: r.name,
    readOnly: true,
    content: r.code
  }));
};

exports.dataSchemaFiles = dataSchemaFiles;

const getSchemaVersion = async (args, context) => {
  const files = await dataSchemaFiles(args, context);

  return createMd5Hex(files);
};

exports.getSchemaVersion = getSchemaVersion;
