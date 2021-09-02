import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

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
    return apiError(err);
  }

  return false;
};
