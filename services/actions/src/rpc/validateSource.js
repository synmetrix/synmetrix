import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';

export default async (session, input, headers) => {
  const { id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).validateCode();

    return result;
  } catch (err) {
    return apiError(err);
  }

  return false;
};
