import { useReducer, useCallback } from 'react';
import { set, remove, getOr } from 'unchanged';

const defaultFilterValues = {
  time: {
    operator: 'onTheDate',
    values: 'This year'
  },
  string: {
    operator: 'set'
  },
  number: {
    operator: 'set'
  }
};

const reducer = (state, action) => {
  let { memberType } = action;
  
  if (action.type === 'add') {    
    let { value } = action;

    if (memberType !== 'filters') {
      const [memberName, granularity = null] = action?.value?.split(/\+/);

      if (granularity) {
        memberType = 'timeDimensions';
        value = {
          dimension: memberName,
          granularity,
        };
      }

      const isMemberExists = !!state[memberType].find(member => member.dimension === memberName && member.granularity === granularity);

      if (isMemberExists) {
        return state;
      }
    } else {
      value = {
        ...action.value,
        ...defaultFilterValues[action.operatorType]
      };
    }

    const elementsCount = getOr([], memberType, state).length;

    return set([memberType, elementsCount], value, state);
  }

  if (action.type === 'update') {
    return set([action.memberType, action.index], action.newValue, state);
  }

  if (action.type === 'setLimit') {
    return {
      ...state,
      limit: parseInt(action.rowsLimit, 10)
    };
  }
  if (action.type === 'setOffset') {
    return {
      ...state,
      offset: parseInt(action.value, 10),
    };
  }
  if (action.type === 'setPage') {
    return {
      ...state,
      page: parseInt(action.value, 10),
    };
  }
  if (action.type === 'setOrder') {
    const { value } = action;

    const sortValue = value.map(sortMember => {
      const { id, desc } = sortMember;
      const [cube, field, granularity] = id.split('.');

      if (granularity) {
        const memberId = `${cube}.${field}`;

        const isMemberExists = !!state.order.find(orderMember => orderMember.id === memberId);
        if (isMemberExists) {
          return null;
        }

        return {
          id: memberId,
          desc
        };
      }

      return sortMember;
    }).filter(Boolean);

    return set('order', sortValue, state);
  }

  if (action.type === 'remove') {
    let { index } = action;
    const { value } = action;

    if (memberType !== 'filters') {

      const [memberName, granularity = null] = value?.split(/\+/);

      if (granularity) {
        memberType = 'timeDimensions';
        index = state[memberType].findIndex(member => member.dimension === memberName && member.granularity === granularity);
      }
    }

    return remove([memberType, index], state);
  }

  if (action.type === 'reset') {
    return action.newState;
  }

  throw new Error(`Unknown action ${action.type}.`);
};

const queryBaseMembers = {
  measures: [],
  dimensions: [],
  filters: [],
  timeDimensions: [],
  segments: [],
};

export const queryState = {
  ...queryBaseMembers,
  order: [],
  timezone: 'UTC',
  limit: 1000,
  offset: 0,
  page: 0,
};

export const initialState = {
  ...queryState,
};

const getName = member => member.name;

const getOperatorType = member => getOr('', 'dimension.type', member);

const useAnalyticsQuery = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateMember = useCallback(
    (memberType, toQuery = getName) => ({
      add: member => dispatch({ type: 'add', memberType, value: toQuery(member), operatorType: getOperatorType(member) }),
      remove: member => dispatch({ type: 'remove', memberType, value: toQuery(member), index: member.index }),
      update: (member, newValue) =>
        dispatch({ type: 'update', memberType, index: member.index, newValue: toQuery(newValue) }),
    }),
    [dispatch]
  );

  const setLimit = useCallback(rowsLimit => dispatch({ type: 'setLimit', rowsLimit }), [dispatch]);
  const setOffset = useCallback((value) => dispatch({ type: 'setOffset', value }), [dispatch]);
  const setPage = useCallback((value) => dispatch({ type: 'setPage', value }), [dispatch]);
  const setOrderBy = useCallback(value => dispatch({ type: 'setOrder', value }), [dispatch]);
  const doReset = useCallback(newState => dispatch({ type: 'reset', newState }), [dispatch]);

  return {
    state,
    dispatch,
    updateMember,
    setLimit,
    setOffset,
    setPage,
    setOrderBy,
    doReset,
  };
};

export default useAnalyticsQuery;
