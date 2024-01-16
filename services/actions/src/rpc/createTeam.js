import { createTeamMember, OWNER_ROLE } from "./inviteTeamMember.js";

import apiError from "../utils/apiError.js";
import { fetchGraphQL } from "../utils/graphql.js";

const createTeamMutation = `
  mutation ($user_id: uuid, $name: String) {
    insert_teams_one(object: { user_id: $user_id, name: $name }) {
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

const updateAssetsMutation = `
  mutation ($userId: uuid!, $teamId: uuid!) {
    update_datasources(where: {_and: {team_id: {_is_null: true}, user_id: {_eq: $userId}}}, _set: {team_id: $teamId}) {
      affected_rows
    }
    update_dashboards(where: {_and: {team_id: {_is_null: true}}, user_id: {_eq: $userId}}, _set: {team_id: $teamId}) {
      affected_rows
    }
  }
`;

const createTeam = async ({ userId, name }) => {
  const res = await fetchGraphQL(createTeamMutation, { user_id: userId, name });
  return res?.data?.insert_teams_one;
};

export default async (session, input) => {
  const { name = "Default team" } = input || {};
  const userId = session?.["x-hasura-user-id"] || input?.event?.data?.new?.id;

  let newTeam;

  try {
    newTeam = await createTeam({ userId, name });
    const { id: teamId } = newTeam;

    if (!teamId) {
      throw new Error("No team created. Contact Administrator");
    }

    await createTeamMember({
      userId,
      teamId,
      role: OWNER_ROLE,
    });

    await fetchGraphQL(updateAssetsMutation, { teamId, userId });

    return newTeam;
  } catch (err) {
    if (newTeam?.id) {
      await fetchGraphQL(deleteTeamMutation, { id: newTeam?.id });
    }

    return apiError(err);
  }
};
