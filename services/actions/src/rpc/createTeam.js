import { createTeamMember, OWNER_ROLE } from './inviteTeamMember';

import { fetchGraphQL } from '../utils/graphql';
import apiError from '../utils/apiError';

const createTeamMutation = `
  mutation ($name: String) {
    insert_teams_one(object: { name: $name }) {
      id
      name
    }
  }
`;

const deleteTeamMutation = `
  mutation ($id: uuid!) {
    delete_teams_by_pk(id: $id) {
      id
    }
  }
`;

const createTeam = async ({ name }, authToken) => {
  const res = await fetchGraphQL(createTeamMutation, { name }, authToken);
  return res?.data?.insert_teams_one;
};

export default async (session, input) => {
  const { name } = input || {};
  const userId = session?.['x-hasura-user-id'];

  let newTeam;

  try {
    newTeam = await createTeam({ name });
    const { id: teamId } = newTeam;

    if (!teamId) {
      throw new Error('No team created. Contact Administrator');
    }

    await createTeamMember({
      userId,
      teamId,
      role: OWNER_ROLE,
    });

    return newTeam;
  } catch (err) {
    if (newTeam?.id) {
      await fetchGraphQL(deleteTeamMutation, { id: newTeam?.id });
    }

    return apiError(err);
  }
};
