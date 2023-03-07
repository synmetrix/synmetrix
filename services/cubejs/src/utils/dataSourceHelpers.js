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
  query ($offset: Int, $limit: Int, $where: branches_bool_exp, $order_by: [branches_order_by!]) {
    branches(where: $where) {
      versions(limit: 1, order_by: {created_at: desc}) {
        dataschemas {
          id
          name
          code
        }
      }
    }

    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      code
    }
  }
`;


const upsertCommitMutation = `
  mutation ($object: versions_insert_input!) {
    insert_versions_one(
      object: $object
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

export const createDataSchema = async (object) => {
  const { authToken, ...commit } = object;

  let res = await fetchGraphQL(upsertCommitMutation, { object: commit }, authToken);
  console.log(res);
  res = res?.data?.insert_dataschemas_one;

  console.log(commit);

  return res;
};

export const findDataSchemas = async (args) => {
  let vars = {
    order_by: {
      created_at: 'asc',
      status: 'active',
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

export const dataSchemaFiles = async (args) => {
  if (!args.dataSourceId) {
    return [];
  }

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
