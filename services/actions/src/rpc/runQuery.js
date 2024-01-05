import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';

export default async (session, input, headers) => {
  const { datasource_id: dataSourceId, branch_id: branchId, query, limit } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      branchId,
      userId,
      authToken: headers?.authorization,
    }).runSQL(query, limit);

    return {
      result,
    };
  } catch (err) {
    return apiError(err);
  }

  return false;
};
