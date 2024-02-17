import cubejsClientCore from "@cubejs-client/core";
import fetch from "node-fetch";
import timeoutSignal from "timeout-signal";

import { fetchGraphQL } from "../utils/graphql.js";
import dateParser from "./dateParser.js";
import pickKeys from "./pickKeys.js";
import { DEFAULT_CATEGORIES } from "./playgroundState.js";

const accessListQuery = `
  query ($userId: uuid!, $dataSourceId: uuid!) {
    users_by_pk(id: $userId) {
      display_name
      members (where: {team: {datasources: {id: {_eq: $dataSourceId}}}}) {
        member_roles {
          access_list {
            config
          }
          team_role
        }
      }
    }
  }
`;

const { CubejsApi: CubejsApiClient } = cubejsClientCore;
const CUBEJS_URL = process.env.CUBEJS_URL || "http://cubejs:4000";

const queryBaseMembers = [
  "measures",
  "dimensions",
  "filters",
  "timeDimensions",
  "segments",
  "order",
  "timezone",
  "limit",
  "offset",
];

const parseDates = (filters, timezone = "UTC") => {
  return filters.map((f) => {
    let newValues = f.values || [];
    if (typeof f.values === "string") {
      newValues = dateParser(newValues, timezone);
    }

    if (
      newValues.length > 1 &&
      (f.operator || "").match(/afterDate|beforeDate/)
    ) {
      newValues = [newValues[0]];
    }

    return { ...f, values: newValues };
  });
};

const isQueryPresent = (obj) =>
  obj.measures?.length || obj.dimensions?.length || obj.timeDimensions?.length;

const normalizeQuery = (playgroundState) => {
  if (!isQueryPresent(playgroundState)) {
    throw "Query is empty";
  }

  const query = pickKeys(queryBaseMembers, playgroundState);
  query.filters = parseDates(query.filters, query.timezone);

  if (Array.isArray(query.order)) {
    // we get Array from Playground by default
    query.order = query.order.reduce(
      (acc, curr) => {
        const direction = (curr.desc && "desc") || "asc";

        return {
          ...acc,
          [curr.id]: direction,
        };
      },
      { "emptyCube.emptyKey": "asc" }
    );
  }

  return { query };
};

const filterByPermissions = async (meta, userId, dataSourceId, authToken) => {
  const accessData = await fetchGraphQL(
    accessListQuery,
    { userId, dataSourceId },
    authToken
  );
  const member = accessData?.data?.users_by_pk?.members?.[0];
  const memberRole = member?.member_roles?.[0];

  const config = memberRole?.access_list?.config;
  const role = memberRole?.team_role;

  let result = meta;
  if (role === "member" && config) {
    const accessDatasource = config?.datasources?.[dataSourceId]?.cubes;

    result = result
      .map((cube) => {
        const cubePermissions = accessDatasource?.[cube.name];

        if (!Object.values(cubePermissions || {}).length) {
          return null;
        }

        DEFAULT_CATEGORIES.forEach((category) => {
          cube[category] = (cube?.[category] || []).filter((col) =>
            (cubePermissions?.[category] || []).includes(col.name)
          );
        });

        return cube;
      })
      .filter(Boolean);
  }

  return result;
};

const cubejsApi = ({ dataSourceId, branchId, userId, authToken }) => {
  let cubejsAuthToken;

  if (authToken.startsWith("Bearer ")) {
    cubejsAuthToken = authToken.split(" ")[1];
  } else {
    cubejsAuthToken = authToken;
  }

  const reqHeaders = {
    Authorization: `Bearer ${cubejsAuthToken}`,
    "x-hasura-datasource-id": dataSourceId,
  };

  if (branchId) {
    reqHeaders["x-hasura-branch-id"] = branchId;
  }

  const apiUrl = `${CUBEJS_URL}/api/v1`;
  const init = new CubejsApiClient(authToken, {
    apiUrl,
    headers: reqHeaders,
  });

  const fetchCubeJS = async ({ route, method = "get", params }) => {
    const url = `${apiUrl}${route}`;
    let res;

    let signal = timeoutSignal(10 * 1000);

    if (route === "/get-schema" || route === "/generate-dataschema") {
      signal = timeoutSignal(180 * 1000);
    }

    if (method === "get") {
      res = await fetch(url, {
        headers: reqHeaders,
        params,
        signal,
      });
    } else {
      res = await fetch(url, {
        headers: {
          ...reqHeaders,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(params),
        signal,
      });
    }

    let data = await res.text();

    try {
      data = JSON.parse(data);
    } catch (err) {
      // do nothing
    }

    if (res.status < 200 || res.status >= 400) {
      return Promise.reject(data);
    }

    return data;
  };

  return {
    meta: async () => {
      const meta = await init.meta();

      let result = meta.cubes;
      if (userId) {
        result = await filterByPermissions(
          meta.cubes || {},
          userId,
          dataSourceId,
          authToken
        );
      }

      return result;
    },
    query: async (playgroundState, fileType = "json", args = {}) => {
      const normalizedQuery = normalizeQuery(playgroundState);

      const { query } = normalizedQuery;
      const { renewQuery } = args;
      query.renewQuery = renewQuery;

      const options = {
        progressCallback: (obProgress) => {
          throw obProgress;
        },
      };

      let data;

      if (fileType === "sql") {
        const resultSet = await init.sql(query, options);
        const {
          sql: [rawSql, params],
          ...restProps
        } = resultSet?.sqlQuery?.sql;

        data = {
          params,
          sql: rawSql,
          ...restProps,
        };
      } else {
        const resultSet = await init.loadMethod(
          () => init.request("load", { query, headers: reqHeaders }),
          (body) => {
            return { loadResponse: body };
          },
          options
        );

        data = resultSet?.loadResponse;

        if (data.data && Array.isArray(data.data)) {
          const dataSize = data.data.length;

          if (query.limit <= dataSize) {
            data.hitLimit = true;
          }
        }
      }

      return data;
    },
    runScheduledRefresh: () => {
      return fetchCubeJS({ route: "/run-scheduled-refresh" });
    },
    test: () => {
      return fetchCubeJS({ route: "/test" });
    },
    getSchemaTables: () => {
      return fetchCubeJS({ route: "/get-schema" });
    },
    generateSchemaFiles: (params) => {
      return fetchCubeJS({
        route: "/generate-models",
        method: "post",
        params,
      });
    },
    runSQL: (rawSQL, limit) => {
      return fetchCubeJS({
        route: "/run-sql",
        method: "post",
        params: { query: `SELECT * FROM (${rawSQL}) as q LIMIT ${limit}` },
      });
    },
    getPreAggregation: () => {
      return fetchCubeJS({ route: "/pre-aggregations" });
    },
    getPreAggregationPreview: (params) => {
      return fetchCubeJS({
        route: "/pre-aggregation-preview",
        method: "post",
        params,
      });
    },
  };
};

export default cubejsApi;
