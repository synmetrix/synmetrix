import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';

export default async (session, input, headers) => {
  const userId = session?.['x-hasura-user-id'];
  const { datasource_id: dataSourceId, pre_aggregation_id: preAggregationId } = input || {};

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).getPreAggregationPreview({ preAggregationId });

    return {
      data: result,
    };
  } catch (e) {
    console.log(e);
  }

  return false;
};
