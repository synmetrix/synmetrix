import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';

export default async (session, input, headers) => {
  const { datasource_id: dataSourceId, tables, overwrite } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).generateSchemaFiles({ tables, overwrite });

    return result;
  } catch (err) {
    return apiError(err);
  }

  return false;
};
