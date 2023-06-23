import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';

export default async (session, input, headers) => {
  const userId = session?.['x-hasura-user-id'];
  const { datasource_id: dataSourceId } = input || {};

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).getPreAggregation();
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!', result);
    return {
      data: result,
    };
  } catch (err) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', err);
    return apiError(err);
  }
};
