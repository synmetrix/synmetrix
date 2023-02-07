import { set } from 'unchanged';
import JSum from 'jsum';
import createMd5Hex from './md5Hex.js';
import { fetchGraphQL } from './graphql.js';

const sourceQuery = `
  query ($id: uuid!) {
    datasources_by_pk(id: $id) {
      id
      name
      db_type
      db_params
      dataschemas {
        id
        name
        code
      }
    }
  }
`;

const sourcesQuery = `
  {
    datasources {
      id
      name
      db_type
      db_params
      dataschemas {
        id
        name
        code
      }
    }
  }
`;

const allSchemasQuery = `
  query ($offset: Int, $limit: Int, $where: dataschemas_bool_exp, $order_by: [dataschemas_order_by!]) {
    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      code
    }
  }
`;


const upsertSchemaMutation = `
  mutation ($object: dataschemas_insert_input!) {
    insert_dataschemas_one(
      object: $object,
      on_conflict: {constraint: dataschemas_datasource_id_branch_name_key, update_columns: code}
    ) {
      id
    }
  }
`;

export const findDataSource = async ({ dataSourceId, authToken }) => {
  let res = await fetchGraphQL(sourceQuery, { id: dataSourceId }, authToken);
  res = res?.data?.datasources_by_pk;

  return res;
};

export const getDataSources = async () => {
  let res = await fetchGraphQL(sourcesQuery);
  res = res?.data?.datasources;

  return res;
};

export const buildSecurityContext = (dataSource) => {
  if (!dataSource) {
    throw new Error('No dataSource provided');
  }

  if (!dataSource?.db_params) {
    throw new Error('No dbParams provided');
  }

  const data = {
    dataSourceId: dataSource.id,
    dbType: dataSource.db_type?.toLowerCase(),
    dbParams: dataSource.db_params,
  };

  const dataSourceVersion = JSum.digest(data, 'SHA256', 'hex');

  const files = (dataSource?.dataschemas || []).map(schema => mapSchemaToFile(schema));
  const schemaVersion = createMd5Hex(files);

  return {
    ...data,
    dataSourceVersion,
    schemaVersion,
  }
};

export const createDataSchema = async (object) => {
  const { authToken, ...newObject } = object;

  let res = await fetchGraphQL(upsertSchemaMutation, { object: newObject }, authToken);
  res = res?.data?.insert_dataschemas_one;

  return res;
};

export const findDataSchemas = async (args) => {
  let vars = {
    order_by: {
      created_at: 'asc',
    },
  };

  if (args.dataSourceId) {
    vars = set('where.datasource_id._eq', args.dataSourceId, vars);
  }

  if (args.branch) {
    vars = set('where.branch._eq', args.branch, vars);
  }

  let dataSchemas = await fetchGraphQL(allSchemasQuery, vars, args.authToken);
  dataSchemas = dataSchemas?.data?.dataschemas;

  return dataSchemas;
};

export const mapSchemaToFile = (schema) => ({
  fileName: schema.name,
  readOnly: true,
  content: schema.code
});

export const dataSchemaFiles = async (args) => {
  if (!args.dataSourceId) {
    return [];
  }

  const schemas = await findDataSchemas(args);

  return (schemas || []).map(schema => mapSchemaToFile(schema));
};

export const getSchemaVersion = async (args) => {
  const files = await dataSchemaFiles(args);

  return createMd5Hex(files);
};
