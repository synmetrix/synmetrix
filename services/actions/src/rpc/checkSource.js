import fetch from 'node-fetch';
import cubejsApi from '../utils/cubejsApi';

export default async (session, input) => {
  console.log('======================')
  console.log(session)
  console.log(input)

  const { id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];
  console.log('result');

  try {
    const result = await cubejsApi({
      dataSourceId,
      userId,
    }).test();

    console.log('result');
    console.log(result);

    return {
      code: 'OK',
      message: 'OK',
    };
  } catch (error) {
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
