import graphileUtils from 'graphile-utils';
import unchanged from 'unchanged';

import pg from 'pg';
import { gen } from '../../utils/nameHelpers';
import { createJWT } from '../../utils/jwt';
import { createRow } from '../../utils/pgApi';

import { parseNodeId, currentUserTopicFromContext } from '../helpers.js';
import cubejsApi from '../../utils/cubejsApi.js';

const { makeExtendSchemaPlugin, gql, embed } = graphileUtils;
const { get } = unchanged;

const cubesMeta = async dataSource => {
  try {
    const meta = await cubejsApi({
      dataSourceId: dataSource.rowId,
      userId: dataSource.userId,
    }).meta();

    return meta;
  } catch (e) {
    console.log(e);

    return [];
  }
};

export const find = async (dataSourceId, context) => {
  const { pgClient } = context;
  const userId = get('jwtClaims.user_id', context);

  const { rows: [dataSource] } = await pgClient.query(
    `
    SELECT * FROM
      public.datasources
    WHERE
      id = $1 AND
      user_id = $2
    `,
    [parseInt(dataSourceId), parseInt(userId)],
  );

  return dataSource;
};

const tablesSchema = async dataSource => {
  try {
    const result = await cubejsApi({
      dataSourceId: dataSource.id,
      userId: dataSource.user_id,
    }).getSchemaTables();
    return result;
  } catch (error) {
    return { error };
  }
};

const testConnection = build => async (_query, args, context) => {
  const {
    identifiers: [dataSourceId],
  } = parseNodeId(build, args.input.dataSourceId);

  const dataSource = await find(dataSourceId, context);

  const result = await cubejsApi({
    dataSourceId: dataSource.id,
    userId: dataSource.user_id,
  }).test();
  return result;
};

const runSQL = build => async (_query, args, context) => {
  const {
    identifiers: [dataSourceId],
  } = parseNodeId(build, args.input.dataSourceId);

  const { query, limit } = args.input || {};

  const dataSource = await find(dataSourceId, context);

  const data = await cubejsApi({
    dataSourceId: dataSource.id,
    userId: dataSource.user_id,
  }).runSQL(query, limit);
  return { data };
};

const createDatabase = async ({ userId, newDataSourceName, dbName, pgClient }) => {
  const { PUBLIC_PG_CREDENTIALS } = process.env;

  if (!PUBLIC_PG_CREDENTIALS) {
    throw 'No credentials obtained to create user database. Contact support';
  }

  const pgPublicCredentials = JSON.parse(PUBLIC_PG_CREDENTIALS);

  // TODO move credentials to somewhere else
  const dbOptions = {
    ...pgPublicCredentials,
    database: dbName
  };

  const { rows: [dataSource] } = await pgClient.query(
    `
      INSERT INTO 
        public.datasources (user_id, name, db_type, db_params)
        VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    [userId, newDataSourceName, 'postgres', dbOptions]
  );

  const connectionString = `postgres://${dbOptions['user']}:${dbOptions['password']}@${dbOptions['host']}:${dbOptions['port']}`;

  const client = new pg.Client({ connectionString });
  await client.connect();
  await client.query(`CREATE DATABASE ${dbName}`);
  client.end();

  return dataSource;
}

const allDatasourceTables = build => async (_query, args, context) => {
  const {
    identifiers: [dataSourceId],
  } = parseNodeId(build, args.dataSourceId);

  const dataSource = await find(dataSourceId, context);

  return tablesSchema({
    ...dataSource,
    rowId: dataSource.id,
  });
};

export default makeExtendSchemaPlugin(build => {
  return {
    typeDefs: gql`
      extend type Datasource {
        cubes: JSON! @requires(columns: ["id", "user_id"])
        tablesSchema: JSON! @requires(columns: ["id"])
      }

      input TestConnectionInput {
        dataSourceId: Int!
      }

      type TestConnectionPayload {
        message: String!
      }

      type LoadCSVPayload {
        jobsIds: [Int!]!
      }

      input UploadedFile {
        fileUrl: String!
        tableName: String!
      }

      input RunSQLInput {
        dataSourceId: Int!
        query: String!
        limit: Int!
      }

      input CSVInput {
        cubeForeignKey: String
        primaryKey: String
        delimiter: String
        writePolicy: String
      }

      input LoadCSVInput {
        oldDataSourceId: Int
        newDataSourceName: String
        csvDefinition: CSVInput! 
        files: [UploadedFile]!
      }

      extend type Query {
        allDatasourceTables(dataSourceId: Int!): JSON!
      }

      extend type Mutation {
        testConnection(input: TestConnectionInput!): TestConnectionPayload!
        runSQL(input: RunSQLInput!): JSON!
      }

      type DatasourceSubscriptionPayload {
        datasource: Datasource
      }

      extend type Subscription {
        datasourceUpdated: DatasourceSubscriptionPayload @pgSubscription(
          topic: ${embed(
            (args, context) =>
              currentUserTopicFromContext({ ...args, channelKey: 'dataSourceUpdated'}, context)
          )
        })
      }
    `,
    resolvers: {
      Datasource: {
        cubes: cubesMeta,
        tablesSchema,
      },
      Query: {
        allDatasourceTables: allDatasourceTables(build),
      },
      Mutation: {
        testConnection: testConnection(build),
        runSQL: runSQL(build),
      },
      DatasourceSubscriptionPayload: {
        async datasource(event, _args, _context, { graphile: { selectGraphQLResultFromTable } }) {
          const { pgSql } = build;

          const rows = await selectGraphQLResultFromTable(
            pgSql.fragment`public.datasources`,
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
  };
});
