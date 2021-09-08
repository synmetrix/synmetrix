import unchanged from 'unchanged';

import cubejsApi from '../utils/cubejsApi';
import logger from '../utils/logger';
import apiError from '../utils/apiError';
import { updatePlaygroundState, replaceQueryParams } from '../utils/playgroundState';
import { fetchGraphQL } from '../utils/graphql';

const { get, getOr } = unchanged;

const explorationQuery = `
  query ($id: uuid!) {
    explorations_by_pk(id: $id) {
      id
      datasource_id
      playground_state
    }
  }
`;

export const rawSql = async (exploration, args = {}) => {
  const { playground_state: playgroundState } = exploration;

  const cubejs = cubejsApi({
    dataSourceId: exploration.datasource_id,
    userId: args.userId,
  });

  const meta = await cubejs.meta();

  const { updatedPlaygroundState } = updatePlaygroundState(playgroundState, meta);

  if (args.limit) {
    updatedPlaygroundState.limit = args.limit;
  }

  if (args.offset) {
    updatedPlaygroundState.offset = args.offset;
  }

  const sql = await cubejs.query(updatedPlaygroundState, 'sql');

  if (sql) {
    sql.sql = replaceQueryParams(sql.sql, sql.params);
  }

  return sql;
};

export default async (session, input) => {
  const { exploration_id: explorationId } = input || {};
  const userId = session?.['x-hasura-user-id'];

  try {
    const exploration = await fetchGraphQL(explorationQuery, { id: explorationId });

    const { sql, params, preAggregations } = await rawSql(
      exploration?.data?.explorations_by_pk,
      {
        userId,
      }
    );

    return {
      result: {
        sql,
        params,
        preAggregations,
      },
    };
  } catch (err) {
    return apiError(err);
  }

  return false;
};
