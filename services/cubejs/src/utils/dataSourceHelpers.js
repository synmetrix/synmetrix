import { set } from 'unchanged';
import JSum from 'jsum';
import createMd5Hex from './md5Hex.js';
import { fetchGraphQL } from './graphql.js';

const sourceFragment = `
  id
  name
  db_type
  db_params
  dataschemas {
    id
    name
    code
  }
`;

const sourceQuery = `
  query ($id: uuid!) {
    datasources_by_pk(id: $id) {
      ${sourceFragment}
    }
  }
`;

const sourcesQuery = `
  {
    datasources {
      ${sourceFragment}
    }
  }
`;

const allSchemasQuery = `
  query ($order_by: [versions_order_by!], $datasource_id: uuid) {
    branches(limit: 1, where: {status: {_eq: "active"}, datasource_id: {_eq: $datasource_id}}) {
      versions(limit: 1, order_by: $order_by) {
        dataschemas {
          id
          name
          code
        }
      }
    }
  }
`;


const upsertVersionMutation = `
  mutation ($object: versions_insert_input!) {
    insert_versions_one(
      object: $object
    ) {
      id
    }
  }
`;

const sqlCredentialsQuery = `
  query ($username: String!) {
    sql_credentials(where: {username: {_eq: $username}}) {
      id
      password
      username
      datasource {
        ${sourceFragment}
      }
    }
  }
`;

export const findDataSource = async ({ dataSourceId, authToken }) => {
  let res = await fetchGraphQL(sourceQuery, { id: dataSourceId }, authToken);
  res = res?.data?.datasources_by_pk;

  return res;
};

export const findSqlCredentials = async (username) => {
  let res = await fetchGraphQL(sqlCredentialsQuery, { username });
  res = res?.data?.sql_credentials?.[0];

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
  const { authToken, ...version } = object;

  let res = await fetchGraphQL(upsertVersionMutation, { object: version }, authToken);
  res = res?.data?.insert_dataschemas_one;

  return res;
};

export const findDataSchemas = async (args) => {
  let vars = {
    order_by: {
      created_at: 'desc',
    },
    datasource_id: args?.dataSourceId,
  };

  let dataSchemas = await fetchGraphQL(allSchemasQuery, vars, args.authToken);
  dataSchemas = dataSchemas?.data?.branches?.[0]?.versions?.[0]?.dataschemas || [];

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
