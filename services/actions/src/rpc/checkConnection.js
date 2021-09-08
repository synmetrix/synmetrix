import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

export default async (session, input) => {
  const { datasource_id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).test();

    return result;
  } catch (err) {
    if (err.name === 'AbortError') {
      return apiError({
        code: 'check_connection_timeout',
        message: 'Source connection timeout. Check the credentials',
      })
    }

    return apiError(err);
  }

  return false;
};
