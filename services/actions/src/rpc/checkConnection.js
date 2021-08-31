import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';

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
    logger.error(err);

    if (error.name === 'AbortError') {
      return {
        error: error.name,
        code: 'check_source_timeout',
        message: 'Source connection timeout. Check the credentials',
      };
    }
  }

  return false;
};
