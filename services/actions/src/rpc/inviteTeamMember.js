import fetch from 'node-fetch';

import { fetchGraphQL, parseResponse } from '../utils/graphql';
import logger from '../utils/logger';
import apiError from '../utils/apiError';

const { HASURA_PLUS_ENDPOINT } = process.env;

class MagicLinkError extends Error {
  constructor(message) {
    super(message);

    this.name = 'MagicLinkError';
  }
};


const checkAccountQuery = `
  query ($email: citext) {
    auth_accounts(where: { email: { _eq: $email } }) {
      id
      user_id
    }
  }
`;

const inviteMemberMutation = `
  mutation ($userId: uuid!, $teamId: uuid!) {
    insert_members_one(object: { user_id: $userId, team_id: $teamId }) {
      id
    }
  }
`;

const insertMemberRoleMutation = `
  mutation ($memberId: uuid!, $role: team_roles_enum!) {
    insert_member_roles_one(object: {member_id: $memberId, team_role: $role}) {
      id
    }
  }
`;

const deleteUserMutation = `
  mutation ($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;

const deleteMemberMutation = `
  mutation ($id: uuid!) {
    delete_members_by_pk(id: $id) {
      id
    }
  }
`;

const register = async ({ email }) => {
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

  return parseResponse(result);
};

const sendMagicLink = async ({ email }) => {
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

  return parseResponse(result);
};

const createUserAccount = async ({ email }) => {
  try {
    await register({ email });
  } catch (err) {
    logger.error(err);
  }

  const res = await fetchGraphQL(checkAccountQuery, { email });
  return res?.data?.auth_accounts?.[0];
};

const inviteTeamMember = async ({ userId, teamId, role }) => {
  const res = await fetchGraphQL(inviteMemberMutation, { userId, teamId });
  const data = res?.data?.insert_members_one;

  const result = await fetchGraphQL(insertMemberRoleMutation, {
    memberId: data?.id,
    role
  });

  return data;
};

export default async (session, input) => {
  const {
    email,
    teamId,
    role = 'member'
  } = input || {};

  let userAccount = {};
  let teamMember = {};

  try {
    userAccount = await createUserAccount({ email });

    teamMember = await inviteTeamMember({
      userId: userAccount.user_id,
      teamId,
      role 
    });

    if (!teamMember?.id) {
      throw new Error('Team member not created');
    }

    try {
      await sendMagicLink({ email });
    } catch (err) {
      throw new MagicLinkError('Sending magic link failed. Check your SMTP settings');
    }

    return {
      memberId: teamMember.id,
    };
  } catch (err) {
    if (userAccount?.user_id) {
      await fetchGraphQL(deleteUserMutation, { id: userAccount?.user_id });
    }

    if (teamMember?.id) {
      await fetchGraphQL(deleteMemberMutation, { id: teamMember.id });
    }

    return apiError(err);
  }
};
