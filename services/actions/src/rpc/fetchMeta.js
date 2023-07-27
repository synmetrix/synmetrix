import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';

export default async (session, input, headers) => {
  const { datasource_id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    let result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).meta();
    
    return {
      cubes: result,
    };
  } catch (err) {
    return apiError(err);
  }
};
