import apiError from "../utils/apiError.js";
import cubejsApi from "../utils/cubejsApi.js";

export default async (session, input, headers) => {
  const userId = session?.["x-hasura-user-id"];
  const {
    datasource_id: dataSourceId,
    pre_aggregation_id: preAggregationId,
    table_name: tableName,
  } = input || {};

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).getPreAggregationPreview({ preAggregationId, tableName });

    return {
      data: result,
    };
  } catch (e) {
    return apiError(e);
  }

  return false;
};
