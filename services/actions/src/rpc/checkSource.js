import cubejsApi from '../utils/cubejsApi';

export default (session, input) => {
  console.log('======================')
  console.log(session)
  console.log(input)

  const { id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  // const result = await cubejsApi({
  //   dataSourceId,
  //   userId,
  // }).test();
  //
  // console.log(result);

  return {
    code: 'OK',
    message: 'OK',
  };
};
