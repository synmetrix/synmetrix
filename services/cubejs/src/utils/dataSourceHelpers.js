import { fetchGraphQL } from "./graphql.js";
import { getDataSourceAccessList } from "./defineUserScope.js";
import buildSecurityContext from "./buildSecurityContext.js";

const sourceFragment = `
  id
  name
  db_type
  db_params
  team_id
`;

const modelsFragment = `
  id
  name
  code
`;

const branchesFragment = `
  id
  name
  status
`;

const membersFragment = `
  members {
    id
    team_id
    member_roles {
      id
      team_role
      access_list {
        config
      }
    }
  }
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
    ${branchesFragment}
    ${versionsFragment}
  }
`;

const selectedBranchModelsFragment = `
  branches_by_pk(id: $branchId) {
    ${branchesFragment}
    ${versionsFragment}
  }
`;

const userQuery = `
  query ($userId: uuid!) {
    users_by_pk(id: $userId) {
      datasources {
        ${sourceFragment}
        branches {
          ${branchesFragment}
          ${versionsFragment}
        }
      }
      ${membersFragment}
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
      user {
        ${membersFragment}
      }
      password
      username
      datasource {
        ${sourceFragment}
        ${activeBranchModelsFragment}
      }
    }
  }
`;

export const findUser = async ({ userId }) => {
  const res = await fetchGraphQL(userQuery, {
    userId,
  });

  const dataSources = res?.data?.users_by_pk?.datasources;
  const members = res?.data?.users_by_pk?.members;

  return {
    dataSources,
    members,
  };
};

export const findSqlCredentials = async (username) => {
  const res = await fetchGraphQL(sqlCredentialsQuery, { username });
  const sqlCredentials = res?.data?.sql_credentials?.[0];

  return sqlCredentials;
};

export const getDataSources = async () => {
  let res = await fetchGraphQL(sourcesQuery);
  res = res?.data?.datasources;

  return res;
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
    res?.data?.branches_by_pk?.versions?.[0]?.dataschemas || [];

  return dataSchemas;
};
