import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';

export default async (session, input) => {
  const { datasource_id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).getSchemaTables();

    return result;
  } catch (err) {
    logger.error(err);

    return {
      error: true,
      code: 'get_source_tables_error',
      message: err.message || err,
    };
  }

  return false;
};
