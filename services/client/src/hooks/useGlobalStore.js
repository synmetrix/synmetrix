import { useCallback } from 'react';
import { createStore } from 'react-hooks-global-state';

const initialState = {
  lastUsedDashboardId: localStorage.getItem('lastUsedDashboardId') || 0,
  lastUsedDataSourceId: localStorage.getItem('lastUsedDataSourceId') || '',
  dashboardsCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LAST_USED_DASHBOARD_ID':
      localStorage.setItem('lastUsedDashboardId', action.payload);
      return { ...state, lastUsedDashboardId: action.payload };
    case 'SET_LAST_USED_DATASOURCE_ID':
      localStorage.setItem('lastUsedDataSourceId', action.payload);
      return { ...state, lastUsedDataSourceId: action.payload };
    case 'SET_DASHBOARDS_COUNT':
      return { ...state, dashboardsCount: action.payload };
    default: return state;
  }
};

const { dispatch, useGlobalState } = createStore(reducer, initialState);

export default () => {
  const [lastUsedDashboardId] = useGlobalState('lastUsedDashboardId');
  const setLastUsedDashboardId = useCallback((id) => {
    dispatch({ type: 'SET_LAST_USED_DASHBOARD_ID', payload: id });
  }, []);

  const [lastUsedDataSourceId] = useGlobalState('lastUsedDataSourceId');
  const setLastUsedDataSourceId = useCallback((id) => {
    dispatch({ type: 'SET_LAST_USED_DATASOURCE_ID', payload: id });
  }, []);

  const [dashboardsCount] = useGlobalState('dashboardsCount');
  const setDashboardsCount = useCallback((count) => {
    dispatch({ type: 'SET_DASHBOARDS_COUNT', payload: count });
  }, []);

  return {
    useGlobalState,
    dispatch,
    dashboardsCount, setDashboardsCount,
    lastUsedDashboardId, setLastUsedDashboardId,
    lastUsedDataSourceId, setLastUsedDataSourceId,
  };
};
