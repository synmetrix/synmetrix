import jwt from 'jsonwebtoken';
// import { get, getOr } from 'unchanged';
import cubejsClientCore from '@cubejs-client/core';
import timeoutSignal from 'timeout-signal';
import fetch from 'node-fetch';

import pickKeys from './pickKeys.js';
import dateParser from './dateParser.js';
// import { getJson, postJson } from './request.js';

const { CubejsApi: CubejsApiClient } = cubejsClientCore;
const CUBEJS_SECRET = process.env.CUBEJS_SECRET || 'testToken';
const CUBEJS_URI = process.env.CUBEJS_URI || 'http://cubejs:4000';
export const CUBEJS_DATA_LIMIT = 10000;

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

const cubejsApi = ({ dataSourceId }) => {
  const cubejsToken = jwt.sign({ dataSourceId }, CUBEJS_SECRET, { expiresIn: '1d' });

  const reqHeaders = {
    Authorization: cubejsToken,
  }

  const apiUrl = `${CUBEJS_URI}/cubejs/datasources/v1`;
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
        headers: reqHeaders,
        body: JSON.stringify(params),
        signal: timeoutSignal(10000),
      });
    }

    return res.json();
  };

  return {
    meta: async () => {
      const meta = await init.meta();
      return meta.cubes || {};
    },
    query: async (playgroundState, fileType = 'json', args = {}) => {
      const normalizedQuery = normalizeQuery(playgroundState);

      const { query } = normalizedQuery;
      const { renewQuery, cacheExpireSecs } = args;
      query.renewQuery = renewQuery;

      if (cacheExpireSecs) {
        query.cacheExpireSecs = cacheExpireSecs;
      }

      const options = {
        progressCallback: (obProgress) => {
          throw obProgress
        }
      };

      let data;

      if (fileType === 'sql') {unchangedunchanged
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
          (body, response) => {
            const { headers = { get: () => { } } } = response;
            const contentLength = headers.get('content-length') || 0;

            return { loadResponse: body, contentLength }
          },
          options
        );

        data = resultSet?.loadResponse;
        const { contentLength } = resultSet;

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
      return fetchCubeJS({ route: '/runSql', method: 'post', params: { query: `SELECT * FROM (${rawSQL}) as q LIMIT ${limit};` } });
    },
    validateCode: params => fetchCubeJS({ route: '/validate-code', method: 'post', params }),
  };
};

export default cubejsApi;
