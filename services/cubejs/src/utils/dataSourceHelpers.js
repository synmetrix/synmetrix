import { set } from 'unchanged';
import createMd5Hex from './md5Hex.js';
import { fetchGraphQL } from './graphql.js';

const sourceQuery = `
  query ($id: uuid!) {
    datasources_by_pk(id: $id) {
      id
      name
      db_type
      db_params
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

export const findDataSource = async ({ dataSourceId }) => {
  let res = await fetchGraphQL(sourceQuery, { id: dataSourceId });
  res = res?.data?.datasources_by_pk;

  return res;
};

export const createDataSchema = async (object) => {
  let res = await fetchGraphQL(upsertSchemaMutation, { object });
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

  let dataSchemas = await fetchGraphQL(allSchemasQuery, vars);
  dataSchemas = dataSchemas?.data?.dataschemas;

  return dataSchemas;
};

export const dataSchemaFiles = async (args) => {
  const schemas = await findDataSchemas(args);

  return (schemas || []).map(r => ({
    fileName: r.name,
    readOnly: true,
    content: r.code
  }));
};

export const getSchemaVersion = async (args) => {
  const files = await dataSchemaFiles(args);

  return createMd5Hex(files);
};
