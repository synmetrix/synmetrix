import fetch from 'node-fetch';

import { fetchGraphQL } from '../utils/graphql';
import apiError from '../utils/apiError';

const { HASURA_PLUS_ENDPOINT } = process.env;

const checkAccountQuery = `
  query CheckAccount($email: citext) {
    auth_accounts(where: { email: { _eq: $email } }) {
      user_id
    }
  }
`;

const inviteMemberMutation = `
  mutation InviteMember($userId: uuid, $teamId: uuid) {
    insert_members_one(object: { user_id: $userId, team_id: $teamId }) {
      id
    }
  }
`;

const insertMemberRoleMutation = `
  mutation insertMemberRole($memberId: uuid, $role: team_roles_enum!) {
    insert_member_roles_one(object: {member_id: $memberId, team_role: $role}) {
      id
    }
  }
`;

const register = async ({ email }) => {
  try {
    const result = await fetch(
      `${HASURA_PLUS_ENDPOINT}/auth/register`,
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const response = await result.json();
    return response?.user?.id;
  } catch (error) {
    throw new Error('Error while creating new user: ' + error);
  }
};

const sendMagicLink = async ({ email }) => {
  try {
    const result = await fetch(
      `${HASURA_PLUS_ENDPOINT}/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const response = await result.json();
    return response?.magicLink;
  } catch (error) {
    throw new Error('Error while sending magic link: ' + error);
  }
};

const getUserFromAccount = async ({ email }) => {
  const res = await fetchGraphQL(checkAccountQuery, { email });

  let userId = res?.data?.auth_accounts?.[0]?.user_id;

  if (!userId) {
    userId = await register({ email });
    await sendMagicLink({ email });
  }

  return userId;
};

const inviteTeamMember = async ({ userId, teamId, role }) => {
  const res = await fetchGraphQL(inviteMemberMutation, { userId, teamId });
  const memberId = res?.data?.insert_members_one?.id;

  await fetchGraphQL(insertMemberRoleMutation, { memberId, role });

  return memberId;
};

export default async (session, input) => {
  const {
    email,
    teamId,
    role = 'member'
  } = input || {};

  let { userId } = input;

  try {
    if (!userId) {
      userId = await getUserFromAccount({ email });
    }

    const memberId = await inviteTeamMember({ userId, teamId, role });

    return { memberId };
  } catch (err) {
    return apiError(err);
  }
};
