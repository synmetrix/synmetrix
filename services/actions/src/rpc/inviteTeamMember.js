import fetch from "node-fetch";

import apiError from "../utils/apiError.js";
import { fetchGraphQL, parseResponse } from "../utils/graphql.js";
import logger from "../utils/logger.js";

const { HASURA_PLUS_ENDPOINT } = process.env;

class MagicLinkError extends Error {
  constructor(message) {
    super(message);

    this.name = "MagicLinkError";
  }
}

const teamQuery = `
  query ($id: uuid!) {
    teams_by_pk(id: $id) {
      id
      members {
        id
        user_id
        member_roles {
          team_role
        }
      }
    }
  }
`;

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
  const result = await fetch(`${HASURA_PLUS_ENDPOINT}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return parseResponse(result);
};

const sendMagicLink = async ({ email }) => {
  const result = await fetch(`${HASURA_PLUS_ENDPOINT}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return parseResponse(result);
};

const createUserAccount = async ({ email }, authToken) => {
  let newUser = false;

  try {
    await register({ email });
    newUser = true;
  } catch (err) {
    logger.error(err);
  }

  const res = await fetchGraphQL(checkAccountQuery, { email }, authToken);
  return [res?.data?.auth_accounts?.[0], newUser];
};

export const createTeamMember = async ({ userId, teamId, role }) => {
  const res = await fetchGraphQL(inviteMemberMutation, { userId, teamId });
  const data = res?.data?.insert_members_one;

  const result = await fetchGraphQL(insertMemberRoleMutation, {
    memberId: data?.id,
    role,
  });

  return data;
};

export const OWNER_ROLE = "owner";
const hasAccess = (members, userId) => {
  const teamMember = members.find((member) => member?.user_id === userId);

  return teamMember?.member_roles?.find(
    (role) => role.team_role === OWNER_ROLE
  );
};

export default async (session, input, headers) => {
  const { email, teamId, role = "member", magicLink = true } = input || {};

  const { authorization: authToken } = headers || {};
  const userId = session?.["x-hasura-user-id"];

  let userAccount = {};
  let teamMember = {};
  let newUser = false;

  try {
    const team = await fetchGraphQL(teamQuery, { id: teamId }, authToken);
    const members = team.data?.teams_by_pk?.members;

    if (members?.length && !hasAccess(members, userId)) {
      throw new Error("You have no permissions to invite users");
    }

    [userAccount, newUser] = await createUserAccount({ email });

    if (!userAccount?.user_id) {
      throw new Error("User account was not created, something went wrong");
    }

    teamMember = await createTeamMember({
      userId: userAccount?.user_id,
      teamId,
      role,
    });

    if (!teamMember?.id) {
      throw new Error("Team member was not created");
    }

    try {
      if (magicLink) {
        await sendMagicLink({ email });
      }
    } catch (err) {
      throw new MagicLinkError(
        "Sending magic link failed. Check your SMTP settings"
      );
    }

    return {
      memberId: teamMember.id,
    };
  } catch (err) {
    if (userAccount?.user_id && newUser) {
      await fetchGraphQL(deleteUserMutation, { id: userAccount?.user_id });
    }

    if (teamMember?.id) {
      await fetchGraphQL(deleteMemberMutation, { id: teamMember.id });
    }

    return apiError(err);
  }
};
