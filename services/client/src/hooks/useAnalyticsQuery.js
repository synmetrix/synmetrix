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
  if (action.type === 'add') {
    let { value } = action;
    const elementsCount = getOr([], action.memberType, state).length;

    if (action.memberType !== 'filters') {
      const notUniq = state[action.memberType].find(member => member === value);

      if (notUniq) {
        return state;
      }
    } else {
      value = {
        ...action.value,
        ...defaultFilterValues[action.operatorType]
      };
    }

    return set([action.memberType, elementsCount], value, state);
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
    return set('order', action.value, state);
  }

  if (action.type === 'remove') {
    return remove([action.memberType, action.index], state);
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
      remove: member => dispatch({ type: 'remove', memberType, index: member.index }),
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
