import apiError from "../utils/apiError.js";
import { fetchGraphQL } from "../utils/graphql.js";
import createMd5Hex from "../utils/md5Hex.js";

const datasourcesQuery = `
  query ($id: uuid!) {
    datasources_by_pk(id: $id)  {
      id
      user_id
      branches {
        id
      }
      dataschemas {
        id
        code
        name
        user_id
        datasource_id
      }
    }
  }
`;

const createBranchMutation = `
  mutation ($object: branches_insert_input!) {
    insert_branches_one(object: $object) {
      id
    }
  }
`;

export default async (session, input, headers) => {
  const datasourceId = input?.event?.data?.new?.id;

  if (!datasourceId) {
    return apiError("There is no datasource_id!");
  }

  try {
    const datasourcesResp = await fetchGraphQL(datasourcesQuery, {
      id: datasourceId,
    });
    const datasource = datasourcesResp?.data?.datasources_by_pk;
    const dataschemas = datasource?.dataschemas || [];
    const branches = datasource?.branches || [];

    if (branches.length) {
      return "Branches already created.";
    }

    let checksum = "No data";
    if (dataschemas.length) {
      checksum = dataschemas.reduce((acc, cur) => acc + cur.code, "");
      checksum = createMd5Hex(checksum);
    }

    const branchData = {
      name: "main",
      status: "created",
      user_id: datasource.user_id,
      datasource_id: datasourceId,
      versions: {
        data: {
          user_id: datasource.user_id,
          checksum,
          dataschemas: {
            data: dataschemas,
            on_conflict: {
              constraint: "dataschemas_pkey",
              update_columns: ["version_id"],
            },
          },
        },
      },
    };

    const result = await fetchGraphQL(createBranchMutation, {
      object: branchData,
    });
    return result;
  } catch (e) {
    console.log(e);
    return apiError(e);
  }
};
