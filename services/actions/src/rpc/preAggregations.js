import apiError from "../utils/apiError.js";
import cubejsApi from "../utils/cubejsApi.js";

export default async (session, input, headers) => {
  const userId = session?.["x-hasura-user-id"];
  const { datasource_id: dataSourceId } = input || {};

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).getPreAggregation();

    return {
      data: result,
    };
  } catch (err) {
    return apiError(err);
  }
};
