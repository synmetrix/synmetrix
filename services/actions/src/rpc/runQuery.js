import fetch from 'node-fetch';
import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';

export default async (session, input) => {
  const { datasource_id: dataSourceId, query, limit } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).runSQL(query, limit);

    return result;
  } catch (err) {
    logger.error(err);

    return {
      error: true,
      code: 'run_source_query_error',
      message: err.message || err,
    };
  }

  return false;
};
