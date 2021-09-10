import inviteTeamMember from './inviteTeamMember';

import { fetchGraphQL } from '../utils/graphql';
import apiError from '../utils/apiError';

const createTeamMutation = `
  mutation CreateTeam($name: String) {
    insert_teams_one(object: { name: $name }) {
      id
      name
    }
  }
`;

const createTeam = async ({ name }) => {
  const res = await fetchGraphQL(createTeamMutation, { name });

  return res?.data?.insert_teams_one;
};

export default async (session, input) => {
  const { name } = input || {};
  const userId = session?.['x-hasura-user-id'];
  const role = 'owner';

  try {
    const newTeam = await createTeam({ name });
    const { id: teamId } = newTeam;

    await inviteTeamMember(session, { userId, teamId, role });

    return newTeam;
  } catch (err) {
    return apiError(err);
  }
};
