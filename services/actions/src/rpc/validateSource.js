import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';

export default async (session, input) => {
  const { id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).validateCode();

    return result;
  } catch (err) {
    logger.error(err);

    return {
      code: 'validate_schema_code_error',
      message: err.message || err,
    };
  }

  return false;
};
