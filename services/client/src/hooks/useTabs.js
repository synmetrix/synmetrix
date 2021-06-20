import { useCallback, useReducer } from 'react';
import { set, remove } from 'unchanged';

const reducer = (state, action) => {
  if (action.type === 'open') {
    return {
      ...state,
      activeTab: action.data.id,
      tabs: { ...state.tabs, [action.data.id]: action.data.name },
    };
  }

  if (action.type === 'changeTab') {
    return set('activeTab', action.id, state);
  }

  if (action.type === 'change') {
    return set(['tabs', action.id], action.value, state);
  }

  if (action.type === 'close') {
    const tabs = remove(action.id, state.tabs);
    const activeTab = action.id === state.activeTab ? action.fallbackId : state.activeTab;

    return { tabs, activeTab };
  }

  throw new Error(`Unknown action ${action.type}.`);
};

const initialState = {
  tabs: {},
  activeTab: null,
};

export default (defaultState = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...defaultState,
  });

  const openTab = useCallback(data => dispatch({ type: 'open', data }), [dispatch]);
  const closeTab = useCallback((id, fallbackId) => dispatch({ type: 'close', id, fallbackId }), [dispatch]);
  const changeActiveTab = useCallback(id => dispatch({ type: 'changeTab', id }), [dispatch]);

  return { 
    state,
    openTab,
    closeTab,
    changeActiveTab,
  };
};
