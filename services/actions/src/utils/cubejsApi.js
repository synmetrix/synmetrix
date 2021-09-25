import jwt from 'jsonwebtoken';
import cubejsClientCore from '@cubejs-client/core';
import timeoutSignal from 'timeout-signal';
import fetch from 'node-fetch';

import pickKeys from './pickKeys.js';
import dateParser from './dateParser.js';

const { CubejsApi: CubejsApiClient } = cubejsClientCore;
const CUBEJS_SECRET = process.env.CUBEJS_SECRET || 'testToken';
const CUBEJS_URL = process.env.CUBEJS_URL || 'http://cubejs:4000';

const queryBaseMembers = [
  'measures',
  'dimensions',
  'filters',
  'timeDimensions',
  'segments',
  'order',
  'timezone',
  'limit',
  'offset',
];

const parseDates = (filters, timezone = 'UTC') => {
  return filters.map((f) => {
    let newValues = f.values || [];
    if (typeof f.values === 'string') {
      newValues = dateParser(newValues, timezone);
    }

    if (newValues.length > 1 && (f.operator || '').match(/afterDate|beforeDate/)) {
      newValues = [newValues[0]];
    }

    return { ...f, values: newValues };
  });
}

const isQueryPresent = obj => obj.measures?.length || obj.dimensions?.length || obj.timeDimensions?.length;

const normalizeQuery = playgroundState => {
  if (!isQueryPresent(playgroundState)) {
    throw 'Query is empty';
  }

  const query = pickKeys(queryBaseMembers, playgroundState);
  query.filters = parseDates(query.filters, query.timezone);

  if (Array.isArray(query.order)) {
    // we get Array from Playground by default
    query.order = query.order.reduce((acc, curr) => {
      const direction = curr.desc && 'desc' || 'asc';

      return {
        ...acc,
        [curr.id]: direction,
      };
    }, { 'emptyCube.emptyKey': 'asc' });
  }

  return { query };
};

const cubejsApi = ({ dataSourceId, userId, authToken }) => {
  const cubejsToken = jwt.sign({ dataSourceId, userId }, CUBEJS_SECRET, { expiresIn: '1d' });

  const reqHeaders = {
    Authorization: cubejsToken,
    'X-Hasura-Authorization': authToken,
  };

  const apiUrl = `${CUBEJS_URL}/cubejs/datasources/v1`;
  const init = new CubejsApiClient(cubejsToken, { apiUrl, headers: reqHeaders });

  const fetchCubeJS = async ({ route, method = 'get', params }) => {
    const url = `${apiUrl}${route}`;
    let res;

    if (method === 'get') {
      res = await fetch(url, {
        headers: reqHeaders,
        params,
        signal: timeoutSignal(10000),
      });
    } else {
      res = await fetch(url, {
        headers: {
          ...reqHeaders,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(params),
        signal: timeoutSignal(10000),
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
      return meta.cubes || {};
    },
    query: async (playgroundState, fileType = 'json', args = {}) => {
      const normalizedQuery = normalizeQuery(playgroundState);

      const { query } = normalizedQuery;
      const { renewQuery } = args;
      query.renewQuery = renewQuery;

      const options = {
        progressCallback: (obProgress) => {
          throw obProgress
        }
      };

      let data;

      if (fileType === 'sql') {
        const resultSet = await init.sql(query, options);
        const { sql: [rawSql, params], ...restProps } = resultSet?.sqlQuery?.sql;

        data = {
          params,
          sql: rawSql,
          ...restProps,
        };
      } else {
        const resultSet = await init.loadMethod(
          () => init.request('load', { query, headers: reqHeaders }),
          (body) => {
            return { loadResponse: body }
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
      return fetchCubeJS({ route: '/run-scheduled-refresh' });
    },
    test: () => {
      return fetchCubeJS({ route: '/test' });
    },
    getSchemaTables: () => {
      return fetchCubeJS({ route: '/get-schema' });
    },
    generateSchemaFiles: params => {
      return fetchCubeJS({ route: '/generate-dataschema', method: 'post', params });
    },
    runSQL: (rawSQL, limit) => {
      return fetchCubeJS({ route: '/runSql', method: 'post', params: { query: `SELECT * FROM (${rawSQL}) as q LIMIT ${limit}` } });
    },
    validateCode: params => fetchCubeJS({ route: '/validate-code', method: 'post', params }),
  };
};

export default cubejsApi;
