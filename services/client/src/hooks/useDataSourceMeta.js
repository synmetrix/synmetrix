import { useMemo } from 'react';
import { getOr } from 'unchanged';

import fromPairs from 'utils/fromPairs';

const operators = {
  string: [
    { name: 'contains', title: 'contains' },
    { name: 'notContains', title: 'does not contain' },
    { name: 'equals', title: 'equals' },
    { name: 'notEquals', title: 'does not equal' },
    { name: 'set', title: 'is set' },
    { name: 'notSet', title: 'is not set' }
  ],
  number: [
    { name: 'equals', title: 'equals' },
    { name: 'notEquals', title: 'does not equal' },
    { name: 'set', title: 'is set' },
    { name: 'notSet', title: 'is not set' },
    { name: 'gt', title: '>' },
    { name: 'gte', title: '>=' },
    { name: 'lt', title: '<' },
    { name: 'lte', title: '<=' }
  ],
  time: [
    { name: 'inDateRange', title: 'is in range of' },
    { name: 'notInDateRange', title: 'is not in range of' },
    { name: 'onTheDate', title: 'on the date' },
    { name: 'beforeDate', title: 'before date' },
    { name: 'afterDate', title: 'after date' },
    { name: 'set', title: 'is set' },
    { name: 'notSet', title: 'is not set' },
  ],
};

export const granularities = [
  { name: undefined, title: 'w/o grouping' },
  { name: 'second', title: 'Second' },
  { name: 'minute', title: 'Minute' },
  { name: 'hour', title: 'Hour' },
  { name: 'day', title: 'Day' },
  { name: 'week', title: 'Week' },
  { name: 'month', title: 'Month' },
  { name: 'quarter', title: 'Quarter' },
  { name: 'year', title: 'Year' },
];

const memberMap = (memberArray) => fromPairs(memberArray.map(m => [m.name, m]));

class Meta {
  constructor(cubesMap) {
    this.cubesMap = cubesMap || {};
  }

  getCubeMembers(memberName, memberType) {
    const [cube] = memberName.split('.');

    if (!this.cubesMap[cube]) {
      return {};
    }

    return this.cubesMap[cube][memberType] || {};
  }

  resolveMember(memberName, memberType) {
    const [cube] = memberName.split('.');
    
    if (!this.cubesMap[cube]) {
      return { title: memberName, error: `Cube not found ${cube} for path '${memberName}'` };
    }
    
    const memberTypes = Array.isArray(memberType) ? memberType : [memberType];

    const member = memberTypes
        .map(type => this.getCubeMembers(cube, type) && this.getCubeMembers(cube, type)[memberName])
        .find(m => m);

    if (!member) {
      return { title: memberName, error: `Path not found '${memberName}'` };
    }

    return member;
  }

  filterOperatorsForMember(memberName, memberType) {
    const member = this.resolveMember(memberName, memberType);
    return operators[member.type] || operators.string;
  }
};

const enrichPlaygroundMembers = (cubesMetaCls, playgroundState) => {
  const resolveWithIndex = key =>
    getOr([], key, playgroundState).map((value, index) => ({
      index,
      ...cubesMetaCls.resolveMember(value, key),
    }));

  const timeDimensions = getOr([], 'timeDimensions', playgroundState).map((m, index) => ({
    ...m,
    ...cubesMetaCls.resolveMember(m.dimension, 'dimensions'),
    name: m.granularity ? `${m.dimension}+${m.granularity}` : m.dimension,
    index,
  }));

  const filters = getOr([], 'filters', playgroundState).map((m, index) => ({
    ...m,
    dimension: cubesMetaCls.resolveMember(m.dimension, ['dimensions', 'measures']),
    operators: cubesMetaCls.filterOperatorsForMember(m.dimension, ['dimensions', 'measures']),
    index,
  }));

  const enrichedMembers = {
    measures: resolveWithIndex('measures'),
    dimensions: resolveWithIndex('dimensions').filter(m => m.type !== 'time').concat(timeDimensions),
    segments: resolveWithIndex('segments'),
    timeDimensions,
    filters,
  };

  return enrichedMembers;
};

const updatePlaygroundState = (playgroundState, cubesMeta) => {
  const keys = ['dimensions', 'measures', 'segments', 'filters'];

  const updatedPlaygroundState = Object.keys(playgroundState).reduce((acc, curKey) => {
    if (keys.find(key => key === curKey)) {
      const filteredArray = playgroundState[curKey].filter(m => {
        let resolved = false;

        if (curKey === 'filters') {
          resolved = cubesMeta.resolveMember(m.dimension, ['dimensions', 'measures']);
        } else {
          resolved = cubesMeta.resolveMember(m, curKey);
        }

        if (!resolved.error) {
          return true;
        }
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

  return updatedPlaygroundState;
};

export default ({ meta = [], playgroundState }) => {
  const result = useMemo(
    () => {
      if (!meta) {
        return {};
      }
      const cubesPairs = (meta || []).map(c => [
        c.name,
        { 
          measures: memberMap(c.measures),
          dimensions: memberMap(c.dimensions),
          segments: memberMap(c.segments),
          timeDimensions: memberMap(c.dimensions.filter(d => d.type === 'time')),
        }
      ]);
      const cubesMap = fromPairs(cubesPairs);

      const cubesMeta = new Meta(cubesMap);
      const updatedPlaygroundState = updatePlaygroundState(playgroundState, cubesMeta);

      return {
        selectedQueryMembers: enrichPlaygroundMembers(cubesMeta, updatedPlaygroundState),
        availableQueryMembers: cubesMap,
      };
    },
    [meta, playgroundState]
  );

  return result;
};
