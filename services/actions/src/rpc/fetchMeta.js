import apiError from "../utils/apiError.js";
import cubejsApi from "../utils/cubejsApi.js";

export default async (session, input, headers) => {
  const { datasource_id: dataSourceId, branch_id: branchId } = input || {};
  const userId = session?.["x-hasura-user-id"];

  try {
    const result = await cubejsApi({
      dataSourceId,
      branchId,
      userId,
      authToken: headers?.authorization,
    }).meta();

    return {
      cubes: result,
    };
  } catch (err) {
    return apiError(err);
  }
};
