import graphileUtils from 'graphile-utils';
import gqlParseResolve from 'graphql-parse-resolve-info';
import unchanged from 'unchanged';

import { createName } from '../utils/nameHelpers';

import { jwtVerify } from '../utils/jwt';
import { camelizeKeys } from '../utils/camelCaseKeys';
import cubejsApi from '../utils/cubejsApi';

import { updatePlaygroundState } from './extends/extendExploration.js';

const {
  makeChangeNullabilityPlugin,
  makeWrapResolversPlugin,
  makePluginByCombiningPlugins,
} = graphileUtils;

const { parseResolveInfo } = gqlParseResolve;

const { get, set } = unchanged;

export default makePluginByCombiningPlugins(
  // https://www.graphile.org/postgraphile/make-change-nullability-plugin/
  makeChangeNullabilityPlugin({
    ExplorationInput: {
      slug: true,
    },
  }),

  // mutation logger
  makeWrapResolversPlugin(
    (context, build, field) => {
      if (context.scope.isRootMutation) {
        return { scope: context.scope };
      }

      return null;
    },
    ({ scope }) => async (resolver, user, args, context, _resolveInfo) => {
      const role = get('jwtClaims.role', context);

      console.log(`[Started] Mutation '${scope.fieldName}' (role: ${role})`);
      const result = await resolver();
      console.log(`[Finished] Mutation '${scope.fieldName}' (role: ${role})`);

      return result;
    }
  ),

  makeWrapResolversPlugin({
    Mutation: {
      createExploration: {
        async resolve(resolver, mutation, args, context, resolveInfo) {
          const {
            input: {
              exploration: { slug, datasourceId, userId, playgroundState },
            },
          } = args;

          const parsedResolveInfoFragment = parseResolveInfo(resolveInfo);
          let newArgs = parsedResolveInfoFragment.args || {};

          // set slug if not defined
          if (!slug) {
            const newSlug = createName();
            newArgs = set('input.exploration.slug', newSlug, newArgs);
          }

          const cubejs = cubejsApi({
            dataSourceId: datasourceId,
            userId,
          });

          const meta = await cubejs.meta();

          const {
            updatedPlaygroundState,
          } = updatePlaygroundState(playgroundState, meta);

          newArgs = set('input.exploration.playgroundState', updatedPlaygroundState, newArgs);

          const result = await resolver(
            mutation,
            newArgs,
            context,
            resolveInfo,
          );

          return result;
        },
      },
    },
  }),
);
