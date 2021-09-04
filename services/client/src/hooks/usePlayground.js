import { useMemo, useCallback, useState, useEffect, useReducer } from 'react';

import trackEvent from 'utils/trackEvent';
import pickKeys from 'utils/pickKeys';

import useExplorationData from 'hooks/useExplorationData';

import useLocation from './useLocation';
import useAppSettings from './useAppSettings';
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

export default ({ dataSourceId, meta = [], editId, rowsLimit, offset }) => {
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const [settings, dispatchSettings] = useReducer(reducer, initialSettings);

  const {
    current: exploration,
    currentProgress: explorationProgress,
    queries: {
      currentData: {
        fetching: explorationLoading,
      },
      execQueryCurrent,
    },
    mutations: {
      createMutation,
      execCreateMutation,
    }
  } = useExplorations({
    params: {
      editId,
      rowsLimit,
      offset,
    },
    pauseQueryAll: true,
  });

  const playgroundSettings = useMemo(() => exploration.playground_state || {}, [exploration]);

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
  } = useDataSourceMeta({ meta, playgroundState: currPlaygroundState });

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
    hitLimit,
    columns,
    rows,
    ...currPlaygroundState,
    skippedMembers,
    settings
  }),
  [explorationLoading, explorationProgress, hitLimit, columns, rows, currPlaygroundState, skippedMembers, settings]
  );

  const [isQueryChanged, setChangedStatus] = useState(false);

  useEffect(
    () => {
      const { playground_state: playgroundState = queryState } = exploration;

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
    const newState = exploration.playground_state;

    if (newState) {
      doReset(newState);
    }
  }, [exploration.playground_state, doReset]);

  useEffect(() => {
    if (!editId) {
      doReset(initialState);
    }
  }, [editId, doReset]);

  const runQuery = useCallback(() => {
    trackEvent('Run Query');

    const explorationQueryState = pickKeys(queryStateKeys, currPlaygroundState);
    const newExplorationObj = {
      datasource_id: dataSourceId,
      playground_state: explorationQueryState,
      playground_settings: settings,
    };

    return execCreateMutation({ object: newExplorationObj });
  }, [currPlaygroundState, dataSourceId, execCreateMutation, settings]);

  const reset = useCallback(
    (explorationId) => setLocation(withAuthPrefix(`/explore/${dataSourceId}/${explorationId}`)),
    [dataSourceId, setLocation, withAuthPrefix],
  );

  useEffect(() => {
    if (createMutation.data) {
      reset(createMutation.data?.insert_explorations_one?.id);
      createMutation.data = null;
    }
  }, [createMutation.data, reset]);

  return {
    state: explorationState,
    exploration,
    explorationLoading,
    loadExploration: execQueryCurrent,
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
