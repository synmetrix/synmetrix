import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

export default async (session, input) => {
  const { exploration_id: explorationId } = input || {};
  const userId = session?.['x-hasura-user-id'];
  const dataSourceId = null;

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).getSchemaTables();

    return {
      result,
    };
  } catch (err) {
    return apiError(err);
  }

  return false;
};
