import apiError from "../utils/apiError.js";
import cubejsApi from "../utils/cubejsApi.js";
import { fetchGraphQL } from "../utils/graphql.js";
import {
  replaceQueryParams,
  updatePlaygroundState,
} from "../utils/playgroundState.js";

const explorationQuery = `
  query ($id: uuid!) {
    explorations_by_pk(id: $id) {
      id
      branch_id
      datasource_id
      playground_state
    }
  }
`;

export const rawSql = async (exploration, args, authToken) => {
  const { playground_state: playgroundState } = exploration;

  const { userId, limit, offset } = args || {};

  const cubejs = cubejsApi({
    dataSourceId: exploration.datasource_id,
    branchId: exploration.branch_id,
    userId,
    authToken,
  });

  const meta = await cubejs.meta();

  const { updatedPlaygroundState } = updatePlaygroundState(
    playgroundState,
    meta
  );

  if (limit) {
    updatedPlaygroundState.limit = limit;
  }

  if (offset) {
    updatedPlaygroundState.offset = offset;
  }

  const sql = await cubejs.query(updatedPlaygroundState, "sql");

  if (sql) {
    sql.sql = replaceQueryParams(sql.sql, sql.params);
  }

  return sql;
};

export default async (session, input, headers) => {
  const { exploration_id: explorationId } = input || {};
  const userId = session?.["x-hasura-user-id"];
  const { authorization: authToken } = headers || {};

  try {
    const exploration = await fetchGraphQL(
      explorationQuery,
      { id: explorationId },
      authToken
    );

    const { sql, params, preAggregations } = await rawSql(
      exploration?.data?.explorations_by_pk,
      {
        userId,
      },
      authToken
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
};
