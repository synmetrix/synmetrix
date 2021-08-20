import graphileUtils from 'graphile-utils';
import joi from '@hapi/joi';

import { updateRowById, createRow, deleteRowById } from '../../utils/pgApi.js';
import { camelizeKeys } from '../../utils/camelCaseKeys.js';
import { revokeUserJWTs } from '../../utils/jwt';
import { sortBy } from '../../utils/sortBy';
import { gen } from '../../utils/nameHelpers.js';

const inviteSchema = joi.object().keys({
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .min(8)
    .error(new Error('Password should be at least 8 characters')),
  memberName: joi.string(),
  teamRole: joi.string(),
  teamName: joi.string().optional(),
});

const { makeExtendSchemaPlugin, gql } = graphileUtils;

const findOrCreateTeam = async (pgClient, userId, teamName) => {
  let { rows: [team] } = await pgClient.query(
    `
    SELECT * FROM
      public.teams
    WHERE
      id IN (
        SELECT team_id FROM
          public.users
        WHERE
          id = $1
        )
    `,
    [parseInt(userId)],
  );

  if (!team) {
    team = await createTeam(pgClient, teamName, userId);
  }

  return team;
};

const createTeam = async (pgClient, teamName, userId) => {
  const { rows: [team] } = await createRow(pgClient, 'public.teams', {
    name: teamName,
    member_ids: [userId]
  });

  await updateRowById(pgClient, 'public.users', userId, {
    team_id: team.id,
    team_role: 'owner'
  });

  return team;
};

const findOrCreateMember = async (pgClient, args) => {
  const { rows: [member] } = await pgClient.query(
    `
    SELECT team_id FROM
      public.users
    WHERE
      email = $1
    `,
    [args.email],
  );

  if (member) {
    throw new Error('User already exists');
  }

  const { rows: [newMember] } = await createRow(pgClient, 'public.users', args, {
    valuesPlaceholder: '$1, $2, $3, public.crypt_with_salt($4), $5, $6'
  });

  return newMember
}

const inviteTeamMember = _build => async (_query, args, context) => {
  const { pgClient, jwtClaims } = context;
  const { input } = args;
  const {
    memberName,
    teamRole,
    email: memberEmail,
    password: memberPassword
  } = input;
  const formattedEmail = memberEmail.toLowerCase();

  await joi.compile(inviteSchema).validateAsync(input);

  const teamName = input.teamName || gen(6);
  const { user_id: userId } = jwtClaims;
  const team = await findOrCreateTeam(pgClient, userId, teamName);

  const newMember = await findOrCreateMember(pgClient, {
    name: memberName,
    email: formattedEmail,
    role: 'auth_user',
    password: memberPassword,
    team_id: team.id,
    team_role: teamRole
  });

  await updateRowById(pgClient, 'public.teams', team.id, {
    member_ids: [...team.member_ids, newMember.id]
  });

  return camelizeKeys(newMember);
};

const changeMemberRole = _build => async (_query, args, context) => {
  const { pgClient, redisClient } = context;
  const { input } = args;
  const { userId, teamRole } = input;

  await revokeUserJWTs(redisClient, userId);
  const { rows: [row] } = await updateRowById(pgClient, 'public.users', userId, {
    team_role: teamRole
  });

  return camelizeKeys(row);
};

const removeTeamMember = _build => async (_query, args, context) => {
  const { pgClient, jwtClaims } = context;
  const { input } = args;
  const { userId } = input;
  const { user_id: adminId } = jwtClaims;
  const memberId = parseInt(userId, 10);

  const team = await findOrCreateTeam(pgClient, adminId);
  const { id: teamId, member_ids: memberIds = [] } = team;

  if (!memberIds.includes(memberId)) {
    throw new Error('Team doesn\'t include this user');
  }

  const filteredMemberIds = memberIds.filter(id => id !== memberId);
  await updateRowById(pgClient, 'public.teams', teamId, { member_ids: filteredMemberIds });
  await deleteRowById(pgClient, 'public.users', memberId);

  return memberId;
};

const members = build => async (query, _args, _context, resolveInfo) => {
  const { pgSql: sql } = build;
  const { memberIds } = query;

  const rows = await resolveInfo.graphile.selectGraphQLResultFromTable(
    sql.fragment`public.users`,
    (tableAlias, queryBuilder) => {
      queryBuilder.where(
        sql.fragment`${tableAlias}.id = ANY(${sql.value(memberIds)})`
      );
    }
  );

  return sortBy(rows, 'rowId');
};

export default makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      input InviteTeamMemberInput {
        email: String!
        password: String!
        memberName: String!
        teamName: String
        teamRole: String!
      }

      input TeamMemberRoleInput {
        userId: ID!
        teamRole: String!
      }

      input RemoveTeamMemberInput {
        userId: ID!
      }

      extend type Team {
        members: [User!]
      }

      extend type Mutation {
        inviteTeamMember(input: InviteTeamMemberInput!): User!
        changeMemberRole(input: TeamMemberRoleInput!): User!
        removeTeamMember(input: RemoveTeamMemberInput!): ID!
      }
    `,
    resolvers: {
      Team: {
        members: members(build),
      },
      Mutation: {
        inviteTeamMember: inviteTeamMember(build),
        changeMemberRole: changeMemberRole(build),
        removeTeamMember: removeTeamMember(build)
      },
    },
  };
});
