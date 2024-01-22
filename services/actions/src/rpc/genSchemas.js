import apiError from "../utils/apiError.js";
import cubejsApi from "../utils/cubejsApi.js";

export default async (session, input, headers) => {
  const {
    datasource_id: dataSourceId,
    branch_id: branchId,
    tables,
    overwrite,
    format = "yaml",
  } = input || {};

  const userId = session?.["x-hasura-user-id"];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).generateSchemaFiles({ branchId, tables, overwrite, format });

    return result;
  } catch (err) {
    return apiError(err);
  }

  return false;
};
