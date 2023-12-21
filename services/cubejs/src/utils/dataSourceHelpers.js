import { set } from "unchanged";
import JSum from "jsum";
import createMd5Hex from "./md5Hex.js";
import { fetchGraphQL } from "./graphql.js";

const accessListQuery = `
  query ($userId: uuid!) {
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
  }
`;

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

const branchSchemasQuery = `
  query ($order_by: [versions_order_by!], $where: branches_bool_exp) {
    branches (where: $where) {
      versions (limit: 1, order_by: $order_by) {
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
      user_id
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

export const getPermissions = async (userId) => {
  let res = await fetchGraphQL(accessListQuery, { userId });
  res = res?.data?.users_by_pk?.members?.[0]?.member_roles?.[0];

  return {
    config: res?.access_list?.config,
    role: res?.team_role,
  };
};

export const buildSecurityContext = (dataSource) => {
  if (!dataSource) {
    throw new Error("No dataSource provided");
  }

  if (!dataSource?.db_params) {
    throw new Error("No dbParams provided");
  }

  const data = {
    dataSourceId: dataSource.id,
    dbType: dataSource.db_type?.toLowerCase(),
    dbParams: dataSource.db_params,
  };

  const dataSourceVersion = JSum.digest(data, "SHA256", "hex");

  const files = (dataSource?.dataschemas || []).map((schema) =>
    mapSchemaToFile(schema)
  );
  const schemaVersion = createMd5Hex(files);

  return {
    ...data,
    dataSourceVersion,
    schemaVersion,
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

export const findDataSchemas = async (args) => {
  let vars = {
    order_by: {
      created_at: "desc",
    },
    where: {
      datasource_id: {
        _eq: args?.dataSourceId,
      },
    },
  };

  if (args?.branchId) {
    vars = set("where.id._eq", args.branchId, vars);
  } else {
    vars = set("where.status._eq", "active", vars);
  }

  let dataSchemas = await fetchGraphQL(
    branchSchemasQuery,
    vars,
    args.authToken
  );
  dataSchemas =
    dataSchemas?.data?.branches?.[0]?.versions?.[0]?.dataschemas || [];

  return dataSchemas;
};

export const mapSchemaToFile = (schema) => ({
  fileName: schema.name,
  readOnly: true,
  content: schema.code,
});

export const dataSchemaFiles = async (args) => {
  if (!args.dataSourceId) {
    return [];
  }

  let schemas = await findDataSchemas(args);
  schemas = (schemas || []).map((schema) => mapSchemaToFile(schema));

  return schemas;
};

export const getSchemaVersion = async (args) => {
  const files = await dataSchemaFiles(args);

  return createMd5Hex(files);
};
