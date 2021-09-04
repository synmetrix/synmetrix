import fetch from 'node-fetch';

import { fetchGraphQL } from '../utils/graphql';
import apiError from '../utils/apiError';

const { HASURA_PLUS_ENDPOINT } = process.env;

const checkAccountQuery = `
  query CheckAccount($email: String) {
    auth_accounts(where: { email: { _eq: $email } }) {
      user_id
    }
  }
`;

const inviteMemberMutation = `
  mutation InviteMember($user_id: uuid, $team_id: uuid) {
    insert_members_one(object: { user_id: $user_id, team_id: $team_id }) {
      id
    }
  }
`;

const createUser = async ({ email }) => {
  try {
    const result = await fetch(
      `${HASURA_PLUS_ENDPOINT}/auth/register`,
      {
        method: 'POST',
        body: JSON.stringify({ email })
      }
    );

    const response = await result.json();
    return response?.user?.id;
  } catch (error) {
    return null;
  }
};

const getUserFromAccount = async ({ email }) => {
  const res = await fetchGraphQL(checkAccountQuery, { email });

  let userId = res?.data?.auth_accounts?.[0].user_id;

  if (!userId) {
    userId = await createUser(email);
  }

  return userId;
};

const inviteTeamMember = async ({ userId, teamId }) => {
  const res = await fetchGraphQL(inviteMemberMutation, { userId, teamId });

  return res?.data?.insert_members_one?.id;
};

export default async (session, input) => {
  const { email, teamId } = input || {};

  try {
    const userId = await getUserFromAccount({ email, teamId });
    const memberId = await inviteTeamMember({ userId, teamId });

    return { memberId };
  } catch (err) {
    return apiError(err);
  }
};
