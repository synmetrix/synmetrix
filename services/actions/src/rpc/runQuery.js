import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';

export default async (session, input) => {
  const { datasource_id: dataSourceId, query, limit } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).runSQL(query, limit);

    return {
      result,
    };
  } catch (err) {
    return apiError(err);
  }

  return false;
};
