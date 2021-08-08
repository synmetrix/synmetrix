import graphileUtils from 'graphile-utils';

import { parseNodeId, currentUserTopicFromContext } from '../helpers.js';
import cubejsApi from '../../utils/cubejsApi.js';

const { makeExtendSchemaPlugin, gql, embed } = graphileUtils;

const generateDataschemaFiles = build => async (_query, args, context) => {
  const { tables, overWrite } = args.input || {};

  const {
    identifiers: [dataSourceId],
  } = parseNodeId(build, args.input.dataSourceId);
  const { jwtClaims = {} } = context;

  if (!jwtClaims.user_id) {
    throw new Error('User not found');
  }

  tables.forEach(table => {
    const invalidKeys = (table.addCubeJoins || [])
      .filter(joinDesc => !joinDesc.primaryKey.includes('.') || !joinDesc.foreignKey.includes('.'));

    if (invalidKeys.length > 0) {
      throw new Error('Primary and Foreign keys should be formatted as `cubeName`.`propertyName` (with the dot)');
    }
  });

  const result = await cubejsApi({ dataSourceId, userId: jwtClaims.user_id }).generateSchemaFiles({ tables, overWrite });

  return result;
};

const validateCode = () => async (_query, args, context) => {
  const { dataSourceId } = args.input;

  const { jwtClaims } = context;

  if (!jwtClaims.user_id) {
    throw new Error('User not found');
  }
  
  const result = await cubejsApi({ dataSourceId, userId: jwtClaims.user_id }).validateCode();

  if (result.status !== 'ok') {
    throw new Error(result.messages);
  }

  return result;
};

export default makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      input cubeJoin {
        primaryKey: String!
        primaryKeyType: String!
        primaryRelation: String!
        foreignKey: String!
      }

      input DataSourceTable {
        name: String!
        addCubeJoins: [cubeJoin]
      }

      input GenerateSchemaInput {
        dataSourceId: Int!
        tables: [DataSourceTable!]!
        overWrite: Boolean
      }

      input ValidateCodeInput {
        dataSourceId: Int!
      }

      type GenerateSchemaPayload {
        status: String!
      }

      type ValidateCodePayload {
        status: String!
      }

      extend type Mutation {
        generateDataschemaFiles(input: GenerateSchemaInput!): GenerateSchemaPayload!
        validateCode(input: ValidateCodeInput!): ValidateCodePayload!
      }

      type DataschemaSubscriptionPayload {
        dataschema: Dataschema
      }

      extend type Subscription {
        dataschemaUpdated: DataschemaSubscriptionPayload @pgSubscription(
          topic: ${embed(
            (args, context) =>
              currentUserTopicFromContext({ ...args, channelKey: 'dataSchemaUpdated'}, context)
          )
        })
      }
    `,
    resolvers: {
      Mutation: {
        generateDataschemaFiles: generateDataschemaFiles(build),
        validateCode: validateCode(build),
      },
      DataschemaSubscriptionPayload: {
        async dataschema(event, _args, _context, { graphile: { selectGraphQLResultFromTable } }) {
          const { pgSql } = build;

          const rows = await selectGraphQLResultFromTable(
            pgSql.fragment`public.dataschemas`,
            (_tableAlias, sqlBuilder) => {
              sqlBuilder.where(
                pgSql.fragment`${sqlBuilder.getTableAlias()}.id = ${pgSql.value(event.id)}`
              );
            }
          );

          return rows[0];
        },
      }
    },
  }
});
