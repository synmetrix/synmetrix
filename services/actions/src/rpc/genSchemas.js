import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';

export default async (session, input) => {
  const { datasource_id: dataSourceId, tables, overwrite } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).generateSchemaFiles({ tables, overWrite: overwrite });

    return result;
  } catch (err) {
    logger.error(err);

    return {
      error: true,
      code: 'gen_schema_error',
      message: err.message || err,
    };
  }

  return false;
};
