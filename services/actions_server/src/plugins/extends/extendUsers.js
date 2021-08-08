import graphileUtils from 'graphile-utils';
import joi from '@hapi/joi';

import { createJWT, revokeUserJWTs } from '../../utils/jwt';
import { updateRowById } from '../../utils/pgApi.js';
import { getACLByRole } from '../../utils/ACL';

const { makeExtendSchemaPlugin, gql } = graphileUtils;

const ACCESS_TOKEN_TTL = 2 * 24 * 60; // 2 days token ttl
const API_CLIENT_ACCESS_TOKEN_TTL = 30 * 365 * 24 * 60; // 30 years

const signUpSchema = joi.object().keys({
  name: joi.string(),
  email: joi
    .string()
    .email()
    .required()
    .error(new Error('Incorrect email')),
  password: joi
    .string()
    .required()
    .min(8)
    .error(new Error('Password should be at least 8 characters')),
  passwordConfirm: joi
    .string()
    .valid(joi.ref('password'))
    .required()
    .error(new Error('Password and confirmation are not equal')),
});

const loginSchema = joi.object().keys({
  email: joi.string().required(),
  password: joi
    .string()
    .required()
    .min(8)
    .error(new Error('Password should be at least 8 characters')),
});

const updatePassSchema = joi.object().keys({
  currentPassword: joi
    .string()
    .required(),
  password: joi
    .string()
    .required()
    .min(8)
    .error(new Error('Password should be at least 8 characters')),
});

const formatEmail = email => email.toLowerCase();

const signup = async (args, context) => {
  const { email, password, name } = args.input;
  const { pgClient, redisClient } = context;
  const formattedEmail = formatEmail(email);

  await joi.compile(signUpSchema).validateAsync(args.input);

  const { rows: [user] } = await pgClient.query(
    `SELECT * FROM public.users WHERE email = $1;`,
    [formattedEmail]
  );

  if (user) {
    throw new Error('User already exists');
  }

  const insertOptions = {
    name: name || 'user',
    email: formattedEmail,
    role: 'auth_user',
    password,
  };

  const { rows: [newUser] } = await pgClient.query(
    `
      INSERT INTO 
        public.users (name, email, role, password)
        VALUES ($1, $2, $3, public.crypt_with_salt($4))
      RETURNING *;
    `,
    Object.values(insertOptions)
  );

  const teamRole = 'owner';
  const token = await createJWT(
    {
      user_id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      team_role: teamRole,
      is_public: true
    },
    {
      ttl: ACCESS_TOKEN_TTL,
      redisClient
    }
  );

  const { restrictScopes } = getACLByRole(teamRole);

  return { token, teamRole, restrictScopes };
};

const login = async (args, context) => {
  const { email, password } = args.input;
  const { pgClient, redisClient } = context;
  const formattedEmail = formatEmail(email);

  await joi.compile(loginSchema).validateAsync(args.input);

  const { rows: [user] } = await pgClient.query(
    `
      SELECT 
        *
      FROM 
        public.users 
      WHERE 
        email = $1
      AND
        password = public.crypt_with_salt($2)
      ;
    `, 
    [formattedEmail, password]
  );

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.active) {
    throw new Error('User is blocked');
  }

  const teamRole = user.team_role;
  let ttl = ACCESS_TOKEN_TTL;

  if (teamRole === 'client') {
    ttl = API_CLIENT_ACCESS_TOKEN_TTL;
  }

  const token = await createJWT(
    {
      user_id: user.id,
      email: user.email,
      role: user.role,
      team_role: teamRole,
      is_public: true
    },
    {
      ttl,
      redisClient
    }
  );

  const { restrictScopes } = getACLByRole(teamRole);

  return { token, teamRole, restrictScopes };
};

const revokeTokens = async (context) => {
  const { redisClient, jwtClaims } = context;
  const { user_id: userId } = jwtClaims;

  await revokeUserJWTs(redisClient, userId);

  return userId;
};

const toggleUserStatus = async (args, context) => {
  const { pgClient, redisClient } = context;
  const { input } = args;
  const { userId, status } = input;

  await updateRowById(pgClient, 'public.users', userId, {
    active: status
  });

  if (!status) {
    await revokeUserJWTs(redisClient, userId);
  }

  return { newStatus: status };
}

const ACLByRole = async (context) => {
  const { jwtClaims } = context;
  const { team_role: teamRole } = jwtClaims || {};
  const { key, restrictScopes } = getACLByRole(teamRole);

  return { key, restrictScopes };
}

const updatePassword = async (args, context) => {
  const { input } = args;
  const { currentPassword, password } = input;
  const { jwtClaims, pgClient } = context;
  const { user_id: userId } = jwtClaims;

  await joi.compile(updatePassSchema).validateAsync(input);

  const { rows: [user] } = await pgClient.query(
    `
      SELECT 
        *
      FROM 
        public.users 
      WHERE 
        id = $1
      AND
        password = public.crypt_with_salt($2)
      ;
    `, 
    [userId, currentPassword]
  );

  if (!user) {
    throw new Error('Current password is not correct');
  }

  await updateRowById(pgClient, 'public.users', userId, { password }, {
    valuesPlaceholder: 'public.crypt_with_salt($1)'
  });

  return userId;
}

export default makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      input SignupInput {
        email: String!
        password: String!
        passwordConfirm: String!
        name: String
      }

      input LoginInput {
        email: String!
        password: String!
      }

      type TokenPayload {
        token: String
        teamRole: String
        restrictScopes: [String]
      }

      type LoggedPayload {
        userId: Int
        role: String
      }

      input RevokeTokenInput {
        userId: Int
      }

      input ToggleUserStatusInput {
        userId: Int
        status: Boolean
      }

      type ToggleUserStatusPayload {
        newStatus: Boolean
      }

      type ACLPayload {
        key: String,
        restrictScopes: [String!]
      }

      extend type User {
        ACL: ACLPayload!
      }

      input UpdatePasswordInput {
        currentPassword: String!
        password: String!
      }

      extend type Mutation {
        signup(input: SignupInput!): TokenPayload
        login(input: LoginInput!): TokenPayload
        revokeTokens: ID!
        toggleUserStatus(input: ToggleUserStatusInput!): ToggleUserStatusPayload!
        updatePassword(input: UpdatePasswordInput!): ID!
      }
    `,
    resolvers: {
      User: {
        ACL: (_query, _args, context) => ACLByRole(context),
      },
      Mutation: {
        signup: (_query, args, context) => signup(args, context),
        login: (_query, args, context) => login(args, context),
        revokeTokens: (_query, _args, context) => revokeTokens(context),
        toggleUserStatus: (_query, args, context) => toggleUserStatus(args, context),
        updatePassword:  (_query, args, context) => updatePassword(args, context),
      },
    },
  };
});
