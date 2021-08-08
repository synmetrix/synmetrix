import graphileUtils from 'graphile-utils';
import unchanged from 'unchanged';

import cubejsApi from '../../utils/cubejsApi.js';
import ramda from 'ramda';

const { fromPairs } = ramda;

const { makeExtendSchemaPlugin, gql } = graphileUtils;
const { get, getOr } = unchanged;

const replaceQueryParams = (query, paramsValues) => {
  let index = -1;

  return query.replace(/(\$\d+)|\(\?[\w\d ]*\)/g, match => {
    index += 1;

    return match.replace(/\?|\$\d+/, `'${paramsValues[index]}'`);
  });
};

const memberMap = (memberArray) => fromPairs(memberArray.map(m => [m.name, m]));

const getCubeMembers = (memberName, memberType, cubesMap) => {
  const [cube] = memberName.split('.');

  if (!cubesMap[cube]) {
    return null;
  }

  return cubesMap[cube][memberType] || null;
}

const resolveMember = (memberName, memberType, cubesMap) => {
  const [cube] = memberName.split('.');

  const memberTypes = Array.isArray(memberType) ? memberType : [memberType];

  const member = memberTypes
    .map(type => getCubeMembers(cube, type, cubesMap) && getCubeMembers(cube, type, cubesMap)[memberName])
    .find(m => m);

  if (!member) {
    return null;
  }

  return member;
}

export const updatePlaygroundState = (playgroundState, meta) => {
  const cubePairs = (meta || []).map(m => [
    m.name,
    { measures: memberMap(m.measures), dimensions: memberMap(m.dimensions), segments: memberMap(m.segments) }
  ]);

  const cubesMap = fromPairs(cubePairs);

  const skippedMembers = [];

  const keys = ['dimensions', 'measures', 'segments', 'filters'];
  const updatedPlaygroundState = Object.keys(playgroundState).reduce((acc, curKey) => {
    if (keys.find(key => key === curKey)) {
      const filteredArray = playgroundState[curKey].filter(m => {
        if (curKey === 'filters') {
          return resolveMember(m.dimension, ['dimensions', 'measures'], cubesMap);
        }

        const resolved = resolveMember(m, curKey, cubesMap);

        if (resolved) {
          return true;
        }

        skippedMembers.push(m);
      });

      return {
        ...acc,
        [curKey]: filteredArray
      };
    };

    return {
      ...acc,
      [curKey]: playgroundState[curKey]
    };
  }, {});

  return {
    updatedPlaygroundState,
    skippedMembers
  };
};

export const dataCube = async (exploration, args = {}) => {
  let { playgroundState } = exploration;
  const format = getOr('json', 'format', args);
  const renewQuery = getOr(true, 'renewQuery', args);
  const validateMeta = getOr(true, 'validateMeta', args);
  const cacheExpireSecs = get('cacheExpireSecs', args);

  if (args.limit) {
    playgroundState.limit = args.limit;
  }

  if (args.offset) {
    playgroundState.offset = args.offset;
  }

  try {
    const cubejs = cubejsApi({
      dataSourceId: exploration.datasourceId,
      userId: exploration.userId,
    });

    let updatedPlaygroundState = playgroundState;
    let skippedMembers = [];

    if (validateMeta) {
      const meta = await cubejs.meta();

      const normalizedMetaState = updatePlaygroundState(playgroundState, meta);

      updatedPlaygroundState = normalizedMetaState.updatedPlaygroundState;
      skippedMembers = normalizedMetaState.skippedMembers;
    }

    const cubeData = await cubejs.query(updatedPlaygroundState, format, {
      renewQuery,
      cacheExpireSecs,
    });

    return {
      ...cubeData,
      annotation: {
        ...cubeData.annotation,
        skippedMembers
      }
    };
  } catch (e) {
    console.log('e');
    console.log(e);
    const isContinueWait = get('progressResponse.error', e);

    let progress = {
      loading: false,
    };

    if (isContinueWait) {
      progress = {
        loading: true,
        ...(e.progressResponse.stage),
      };
    } else {
      const errMessage = e.message || e;

      if (errMessage) {
        progress.error = errMessage;
      }
    }

    return {
      annotation: {
        skippedMembers: [],
        measures: {},
        dimensions: {},
        timeDimensions: {},
        segments: {},
      },
      data: [],
      progress,
      resourcesAdvice: {}
    };
  }
};

const rawSql = async (exploration, args = {}) => {
  const { playgroundState } = exploration;

  const cubejs = cubejsApi({
    dataSourceId: exploration.datasourceId,
    userId: exploration.userId,
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

export default makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      type ResourcesAdvice {
        CPURate: Int
        RAMRate: Int
      }

      type Annotation {
        skippedMembers: [String!]
        measures: JSON!
        dimensions: JSON!
        timeDimensions: JSON!
        segments: JSON!
      }

      type DataCube {
        annotation: Annotation!
        data: JSON!
        query: JSON
        progress: Progress
        hitLimit: Boolean
        resourcesAdvice: ResourcesAdvice
      }

      type Progress {
        timeElapsed: Int
        stage: String
        loading: Boolean
        error: String
      }

      type SqlQuery {
        sql: String!
        cacheKeyQueries: [JSON!]
        preAggregations: [JSON!]
      }

      extend type Exploration {
        dataCube(limit: Int, offset: Int, renewQuery: Boolean): DataCube! @requires(columns: ["datasource_id", "playground_state", "user_id"])
        rawSql(limit: Int, offset: Int): SqlQuery! @requires(columns: ["datasource_id", "playground_state", "user_id"])
      }
    `,
    resolvers: {
      Exploration: {
        dataCube,
        rawSql,
      },
    },
  };
});
