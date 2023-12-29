import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';
import { fetchGraphQL } from '../utils/graphql';

const roleQuery = `
  query ($user_id: uuid!, $datasource_id: uuid!) {
    member_roles(where: {member: {_and: {user_id: {_eq: $user_id}, team: {datasources: {id: {_eq: $datasource_id}}}}}}) {
      team_role
    }
  }
`;

export default async (session, input, headers) => {
  const { datasource_id: dataSourceId, query, limit } = input || {};
  const userId = session?.['x-hasura-user-id'];
  const authToken = headers?.authorization;

  try {
    const roleResult = await fetchGraphQL(
      roleQuery,
      {
        user_id: userId,
        datasource_id: dataSourceId,
      },
      authToken
    );

    const role = roleResult?.data?.member_roles?.[0]?.team_role;
    if (!['owner', 'admin'].includes(role)) {
      return apiError('No permissions');
    }

    const result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).runSQL(query, limit);

    return {
      result,
    };
  } catch (err) {
    return apiError(err);
  }

  return false;
};
