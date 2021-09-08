import { useMemo, useCallback, useEffect } from 'react';
import { message } from 'antd';

import { get, getOr } from 'unchanged';
import useLocation from 'hooks/useLocation';

import useTabs from 'hooks/useTabs';
import useDataSources from 'hooks/useDataSources';
import useDataSchemas from 'hooks/useDataSchemas';

export default ({ dataSourceId, dataSchemaName }) => {
  const [location, setLocation] = useLocation();
  const defaultTabId = 'sqlrunner';

  const {
    state: tabsState,
    openTab,
    closeTab,
    changeActiveTab
  } = useTabs({ activeTab: defaultTabId });

  const {
    current: dataSource,
    queries: sourceQueries,
    mutations: sourceMutations
  } = useDataSources({ pauseQueryAll: true, editId: dataSourceId });

  const {
    all: allSchemas,
    current: dataSchema,
    queries: schemaQueries,
    mutations: schemaMutations
  } = useDataSchemas({ dataSourceId, editId: dataSchemaName });

  const { 
    currentData: {
      fetching: loadingDataSource,
    },
    execQueryTables 
  } = sourceQueries;

  const {
    currentData: {
      fetching: loadingDataSchemas,
    },
    executeQueryAll 
  } = schemaQueries;

  const { createMutation, genMutation, delMutation, editMutation } = schemaMutations;

  const getTabId = (schema) => schema && schema.id;

  // dataschema records can be deleted
  const tabSchemas = useMemo(() => Object.keys(tabsState.tabs)
      .map(id => allSchemas.find(schema => schema.id === id))
      .filter(Boolean),
  [tabsState.tabs, allSchemas]
  );

  const schemaIdToCode = useMemo(() => allSchemas.reduce((acc, curr) => {
    acc[curr.id] = { name: curr.name, code: curr.code };
    return acc;
  }, {}),
  [allSchemas]
  );

  const changePath = useCallback((activeKey) => {
    const basePath = ['/d/schemas', dataSourceId, activeKey].filter(v => !!v).join('/');

    if (location.pathname !== basePath) {
      setLocation(basePath);
    }
  },
  [dataSourceId, setLocation, location]
  );

  const openSchema = useCallback(
    (schema, hash) => {
      openTab(schema);
      changePath(schema.name);

      if (hash) { 
        window.location.hash = hash;
      }
    },
    [openTab, changePath]
  );

  const onChangeActiveTab = useCallback(id => {
    const activeSchema = schemaIdToCode[id] || {};

    changeActiveTab(id);
    changePath(activeSchema.name || id);
  },
  [changePath, changeActiveTab, schemaIdToCode]
  );

  const onCloseTab = useCallback(id => {
    const fallbackId = getTabId(tabSchemas.find(sc => sc.id !== id)) || defaultTabId;
    closeTab(id, fallbackId);

    return fallbackId;
  },
  [tabSchemas, closeTab]
  );

  useEffect(
    () => {
      if (createMutation.data) {
        const schema = getOr({}, 'createDataschema.dataschemaEdge.node', createMutation.data);
        openSchema(schema);

        createMutation.data = null;
      }
    },
    [createMutation.data, openSchema]
  );

  useEffect(
    () => {
      if (genMutation.data) {
        executeQueryAll({ requestPolicy: 'network-only' });
        genMutation.data = null;
      }
    },
    [genMutation.data, executeQueryAll]
  );

  useEffect(
    () => {
      if (editMutation.data) {
        const schema = get('updateDataschema.dataschema', editMutation.data);
        openSchema(schema);

        editMutation.data = null;

        if (schema) {
          message.success('Saved!');
        }
      }

      if (editMutation.error) {
        message.error(editMutation.error.message);
        editMutation.error = null;
      }
    },
    [editMutation.data, editMutation.error, openSchema]
  );

  useEffect(
    () => {
      if (dataSource.rowId) {
        execQueryTables({ requestPolicy: 'cache-and-network' });
      }
    },
    [dataSource, execQueryTables]
  );

  useEffect(
    () => {
      if (dataSchema.name) {
        openTab(dataSchema);
      }
    },
    [dataSchema, openTab]
  );

  useEffect(
    () => {
      if (delMutation.data) {
        const deletedDataschemaId = get('deleteDataschema.deletedDataschemaId', delMutation.data);

        const fallbackId = onCloseTab(deletedDataschemaId);
        onChangeActiveTab(fallbackId);

        executeQueryAll({ requestPolicy: 'network-only' });
        delMutation.data = null;
      }
    },
    [delMutation.data, executeQueryAll, onCloseTab, onChangeActiveTab]
  );

  const loading = loadingDataSource || loadingDataSchemas;

  return {
    loading,
    getTabId,
    activeTab: tabsState.activeTab,
    closeTab: onCloseTab,
    changeActiveTab: onChangeActiveTab,
    
    allSchemas,
    schemaIdToCode,
    openedSchemas: tabSchemas,
    openSchema,
    schemaQueries,
    schemaMutations,

    dataSource,
    sourceQueries,
    sourceMutations,
  };
};
