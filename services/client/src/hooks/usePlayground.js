import { useMemo, useCallback, useState, useEffect, useReducer } from 'react';
import { get } from 'unchanged';

import trackEvent from 'utils/trackEvent';
import pickKeys from 'utils/pickKeys';

import useExplorationData from 'hooks/useExplorationData';

import useExplorations from './useExplorations';
import useDataSourceMeta from './useDataSourceMeta';
import useAnalyticsQuery, { queryState, initialState } from './useAnalyticsQuery';
import useDeepCompareEffect from './useDeepCompareEffect';
import equals from '../utils/equals';

const queryStateKeys = Object.keys(queryState);

const initialSettings = {
  hideCubeNames: false,
  hideIndexColumn: false,
};

const reducer = (state, action) => {
  if (action.type === 'hideCubeNames') {
    return {
      ...state,
      hideCubeNames: action.value
    };
  }
  if (action.type === 'hideIndexColumn') {
    return {
      ...state,
      hideIndexColumn: action.value
    };
  }
  if (action.type === 'update') {
    return action.value;
  }

  throw new Error(`Unknown action ${action.type}.`);
};

export const getTitle = (settings, column) => (settings.hideCubeNames ? column.shortTitle : column.title);

export const getColumns = (selectedQueryMembers, settings = {}) => [
  ...Object.values(selectedQueryMembers.dimensions || {}),
  ...Object.values(selectedQueryMembers.measures || {})
].map(c => ({ id: c.name, Header: getTitle(settings, c), accessor: (row) => row[c.name], colId: c.name, type: c.type }));

export default ({ dataSource = {}, editId, rowsLimit, offset }) => {
  const [settings, dispatchSettings] = useReducer(reducer, initialSettings);

  const {
    current: exploration,
    currentProgress: explorationProgress,
    queries: {
      currentData: {
        fetching: explorationLoading,
      },
      execQueryAll: loadExploration,
    },
    mutations: {
      execCreateMutation: newExploration,
    }
  } = useExplorations({
    params: {
      dataSourceId: dataSource.rowId,
      editId,
      rowsLimit,
      offset,
    },
    pauseQueryAll: true,
  });

  const playgroundSettings = useMemo(() => get('playgroundSettings', exploration) || {}, [exploration]);
  useDeepCompareEffect(() => {
    dispatchSettings({ type: 'update', value: playgroundSettings });
  }, [playgroundSettings]);

  const {
    state: currPlaygroundState,
    dispatch,
    updateMember,
    setLimit,
    setOffset,
    setPage,
    setOrderBy,
    doReset,
  } = useAnalyticsQuery();

  const {
    selectedQueryMembers,
    availableQueryMembers,
  } = useDataSourceMeta({ dataSource, playgroundState: currPlaygroundState });

  const {
    rows,
    hitLimit,
    skippedMembers: explorationSkippedMembers,
  } = useExplorationData({ exploration });

  const skippedMembers = useMemo(() => {
    if ((explorationSkippedMembers || []).length) {
      return explorationSkippedMembers;
    }
    return [];
  }, [explorationSkippedMembers]);

  const columns = useMemo(() => {
    if (!selectedQueryMembers) { return [] };

    return getColumns(selectedQueryMembers, settings);
  },
  [selectedQueryMembers, settings]
  );

  const explorationState = useMemo(() => ({
    loading: explorationLoading,
    progress: explorationProgress,
    rawSql: exploration.rawSql,
    hitLimit,
    columns,
    rows,
    ...currPlaygroundState,
    skippedMembers,
    settings
  }),
  [explorationLoading, explorationProgress, exploration.rawSql, hitLimit, columns, rows, currPlaygroundState, skippedMembers, settings]
  );

  const [isQueryChanged, setChangedStatus] = useState(false);

  useEffect(
    () => {
      const { playgroundState = queryState } = exploration;

      const isChanged = !equals(
        pickKeys(queryStateKeys, playgroundState),
        pickKeys(queryStateKeys, currPlaygroundState)
      );

      if (isQueryChanged !== isChanged) {
        setChangedStatus(isChanged);
      }
    },
    [isQueryChanged, currPlaygroundState, exploration]
  );

  useEffect(() => {
    const newState = exploration.playgroundState;

    if (newState) {
      doReset(newState);
    }
  }, [exploration.playgroundState, doReset]);

  useEffect(() => {
    if (!editId) {
      doReset(initialState);
    }
  }, [editId, doReset]);

  const runQuery = useCallback(() => {
    trackEvent('Run Query');

    const explorationQueryState = pickKeys(queryStateKeys, currPlaygroundState);
    const newExplorationObj = {
      playgroundState: explorationQueryState,
      playgroundSettings: settings,
    };

    newExploration(newExplorationObj);
  }, [currPlaygroundState, newExploration, settings]);

  return {
    state: explorationState,
    exploration,
    explorationLoading,
    loadExploration,
    selectedQueryMembers,
    availableQueryMembers,
    analyticsQuery: {
      state: currPlaygroundState,
      dispatch,
      updateMember,
      isQueryChanged,
      runQuery,
      setLimit,
      setOffset,
      setPage,
      setOrderBy,
    },
    dispatchSettings
  };
};
