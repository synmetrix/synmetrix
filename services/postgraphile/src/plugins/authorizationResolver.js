import graphileUtils from 'graphile-utils';

import { validateJWT } from '../utils/jwt';
import { getACLByRole } from '../utils/ACL';

const { makeWrapResolversPlugin } = graphileUtils;

const authorizationResolver = makeWrapResolversPlugin(
  (context) => {
    if (context.scope.isRootMutation || context.scope.isRootQuery) {
      if (context.scope.fieldName === 'login' || context.scope.fieldName === 'signup') {
        return null;
      }
      return { scope: context.scope };
    }

    return null;
  },
  ({ scope }) => async (resolver, _user, _args, context) => {
    const { redisClient, jwtClaims } = context;
    const { user_id: userId, team_role: teamRole, is_public: isPublic } = jwtClaims || {};

    if (!userId) {
      throw new Error('JWT is not provided');
    }

    if (isPublic) {
      if (!redisClient) {
        throw new Error('Redis connection is not established');
      }

      const isTokenValid = await validateJWT(redisClient, jwtClaims);

      if (!isTokenValid) {
        throw new Error('JWT is invalid or revoked');
      }

      const { fieldName: methodName } = scope;
      const { restrictMethods } = getACLByRole(teamRole);

      if (restrictMethods.includes(methodName)) {
        throw new Error('No access to method with current team role');
      }
    }

    const resolution = await resolver();
    return resolution;
  }
);

export default authorizationResolver;
