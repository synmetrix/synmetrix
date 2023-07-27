import cubejsApi from '../utils/cubejsApi';
import apiError from '../utils/apiError';
import { fetchGraphQL } from '../utils/graphql';

const accessListQuery = `
  query ($userId: uuid!) {
    users_by_pk(id: $userId) {
      members {
        member_roles {
          team_role
          access_list {
            access_list
          }
        }
      }
    }
  }
`;

export default async (session, input, headers) => {
  const { datasource_id: dataSourceId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  const authToken = headers?.authorization;

  try {
    let result = await cubejsApi({
      dataSourceId,
      userId,
      authToken: headers?.authorization,
    }).meta();
    
    let access = await fetchGraphQL(accessListQuery, { userId }, authToken);
    access = access?.data?.users_by_pk?.members?.[0]?.member_roles?.[0];

    const accessList = access?.access_list?.access_list;
    const role = access?.team_role;
    
    if (role === 'member') {
      const accessDatasource = accessList?.datasources?.[dataSourceId]?.cubes;

      result = result.map(cube => {
        const cubePermissions = accessDatasource?.[cube.name];
        Object.entries(cubePermissions).forEach(([section, columns]) => {
          cube[section] = cube[section].filter(col => columns.includes(col.name));
        })

        return cube;
      });
    }
  
    
    return {
      cubes: result,
    };
  } catch (err) {
    return apiError(err);
  }
};
