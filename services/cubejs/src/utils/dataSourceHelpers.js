import { set } from "unchanged";
import { fetchGraphQL } from "./graphql.js";

const accessListQuery = `
  query ($userId: uuid!, $dataSourceId: uuid!) {
    users_by_pk(id: $userId) {
      members {
        member_roles {
          team_role
          access_list {
            config
          }
        }
      }
    }
    datasources_by_pk(id: $dataSourceId) {
      id
      name
    }
    branches(where: {datasource_id: {_eq: $dataSourceId}, status: {_eq: active}}) {
      id
      name
    }
  }
`;

const sourceFragment = `
  id
  name
  db_type
  db_params
`;

const modelsFragment = `
  id
  name
  code
`;

const versionsFragment = `
  versions (limit: 1, order_by: {created_at: desc}) {
    dataschemas {
      ${modelsFragment}
    }
  }
`;

const activeBranchModelsFragment = `
  branches(where: {status: {_eq: active}}) {
    id
    name
    ${versionsFragment}
  }
`;

const selectedBranchModelsFragment = `
  branches(where: {id: {_eq: $branchId}}) {
    id
    name
    ${versionsFragment}
  }
`;

const sourceQuery = `
  query ($dataSourceId: uuid!, $branchId: uuid!) {
    datasources_by_pk(id: $dataSourceId) {
      ${sourceFragment}
      ${selectedBranchModelsFragment}
    }
  }
`;

const sourcesQuery = `
  {
    datasources {
      ${sourceFragment}
      ${activeBranchModelsFragment}
    }
  }
`;

const branchSchemasQuery = `
  query ($branchId: uuid!) {
    ${selectedBranchModelsFragment}
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
      user_id
      password
      username
      datasource {
        ${sourceFragment}
        ${activeBranchModelsFragment}
      }
    }
  }
`;

export const findDataSource = async ({ dataSourceId, branchId }) => {
  let res = await fetchGraphQL(sourceQuery, { dataSourceId, branchId });
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

export const getPermissions = async ({ dataSourceId, userId, authToken }) => {
  const res = await fetchGraphQL(
    accessListQuery,
    { dataSourceId, userId },
    authToken
  );

  const memberRoles = res?.data?.users_by_pk?.members?.[0]?.member_roles?.[0];
  const defaultBranch = res?.data?.branches?.[0];

  return {
    config: memberRoles?.access_list?.config,
    role: memberRoles?.team_role,
    dataSourceId: res?.data?.datasources_by_pk?.id,
    defaultBranchId: defaultBranch?.id,
  };
};

export const createDataSchema = async (object) => {
  const { authToken, ...version } = object;

  let res = await fetchGraphQL(
    upsertVersionMutation,
    { object: version },
    authToken
  );
  res = res?.data?.insert_versions_one;

  return res;
};

export const findDataSchemas = async ({ branchId, authToken }) => {
  const res = await fetchGraphQL(branchSchemasQuery, { branchId }, authToken);

  const dataSchemas =
    res?.data?.branches?.[0]?.versions?.[0]?.dataschemas || [];

  return dataSchemas;
};

export const mapSchemaToFile = (schema) => ({
  fileName: schema.name,
  readOnly: true,
  content: schema.code,
});

export const dataSchemaFiles = async ({ branchId, authToken }) => {
  if (!branchId) {
    return [];
  }

  let schemas = await findDataSchemas({ branchId, authToken });
  schemas = (schemas || []).map((schema) => mapSchemaToFile(schema));

  return schemas;
};
