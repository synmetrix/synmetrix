/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Icon, Collapse } from 'antd';

import ErrorFound from 'components/ErrorFound';
import ExploreCubes from 'components/ExploreCubes';

import WorkspaceFiltersSection from 'components/WorkspaceFiltersSection';
import WorkspaceVisSection from 'components/WorkspaceVisSection';
import WorkspaceDataSection from 'components/WorkspaceDataSection';

import useTabs from 'hooks/useTabs';
import useDimensions from 'hooks/useDimensions';
import useExploreWorkspace from 'hooks/useExploreWorkspace';
import usePlayground from 'hooks/usePlayground';
import useDataSchemas from 'hooks/useDataSchemas';
import usePermissions from 'hooks/usePermissions';

import s from './ExploreWorkspace.module.css';

const DEFAULT_ACTIVE_TAB = 0;

const ExploreWorkspace = (props) => {
  const [, size] = useDimensions(document.querySelector('#data-view'));
  const { width } = size;

  const {
    header,
    dataSource,
    loading,
    params: {
      explorationId,
      tabId,
      chartId,
    },
  } = props;

  const { state: tabsState } = useTabs({
    activeTab: tabId ? Number(tabId) : DEFAULT_ACTIVE_TAB,
  });

  const {
    selectedQueryMembers = {},
    availableQueryMembers = {},
    exploration,
    state: explorationState,
    analyticsQuery: {
      updateMember,
      isQueryChanged,
      runQuery,
      setLimit,
      setOffset,
      setPage,
      setOrderBy,
    },
    dispatchSettings
  } = usePlayground({ dataSource, editId: explorationId });

  const explorationRowId = useMemo(() => exploration && exploration.rowId, [exploration]);

  const {
    collapseState,
    state,
    onDataSectionChange,
    onToggleSection,
  } = useExploreWorkspace({ selectedQueryMembers });

  const {
    mutations: {
      validateMutation, mExecValidateMutation
    }
  } = useDataSchemas({ dataSourceId: dataSource.rowId });

  useEffect(() => {
    if (dataSource.rowId) {
      mExecValidateMutation();
    }
  }, [dataSource.rowId, mExecValidateMutation]);

  const onRunQuery = (e) => {
    runQuery();

    e.preventDefault();
    e.stopPropagation();
  };

  const onQueryChange = useCallback(
    (type, ...args) => {
      switch (type) {
        case 'limit':
          setLimit(...args);
          break;
        case 'offset':
          setOffset(...args);
          break;
        case 'page':
          setPage(...args);
          break;
        case 'order':
          return setOrderBy;
        case 'hideCubeNames':
          dispatchSettings({ type: 'hideCubeNames', value: args[0] });
          break;
        case 'hideIndexColumn':
          dispatchSettings({ type: 'hideIndexColumn', value: args[0] });
          break;
        default:
          return () => { };
      }

      return null;
    },
    [setLimit, setOffset, setPage, setOrderBy, dispatchSettings]
  );

  const { fallback: cubesFallback } = usePermissions({ scope: 'explore/workspace/cubes' });
  const { fallback: filtersFallback } = usePermissions({ scope: 'explore/workspace/filters' });

  if (!loading && (!dataSource || !dataSource.rowId)) {
    return <ErrorFound status={404} />;
  }

  if (Object.keys(dataSource).length && !availableQueryMembers) {
    return <ErrorFound status={500} />;
  }

  const { activeTab } = tabsState;

  const children = [
    <WorkspaceVisSection
      key="visSec"
      className={{
        [s.hidden]: (activeTab !== 0)
      }}
      explorationRowId={explorationRowId}
      isQueryChanged={isQueryChanged}
      availableQueryMembers={availableQueryMembers}
      selectedQueryMembers={selectedQueryMembers}
      onToggleSection={onToggleSection}
      state={state}
      queryState={explorationState}
      chartId={chartId}
    />,
  ];


  const workspaceLayout = {
    md: 16,
    lg: 19
  };

  if (cubesFallback) {
    workspaceLayout.md = 24;
    workspaceLayout.lg = 24;
  }

  return (
    <Row>
      {!cubesFallback && (
        <Col xs={24} md={8} lg={5} style={{ background: '#f6f6f7' }}>
          {header}
          <ExploreCubes
            availableQueryMembers={availableQueryMembers}
            selectedQueryMembers={selectedQueryMembers}
            onMemberSelect={updateMember}
            dataSchemaValidation={validateMutation}
          />
        </Col>
      )}
      <Col xs={24} {...workspaceLayout}>
        <div id="data-view">
          <Collapse
            bordered={false}
            activeKey={collapseState.activePanelKey}
            className={s.root}
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            openAnimation={{
              appear: () => { },
              enter: () => { },
            }}
          >
            <WorkspaceDataSection
              key="dataSec"
              width={width}
              selectedQueryMembers={selectedQueryMembers}
              onToggleSection={onToggleSection}
              onSectionChange={onDataSectionChange}
              onExec={onRunQuery}
              onQueryChange={onQueryChange}
              disabled={!isQueryChanged}
              state={state}
              queryState={explorationState}
              explorationRowId={explorationRowId}
            />
            {!filtersFallback && (
              <WorkspaceFiltersSection
                key="filtersSec"
                availableQueryMembers={availableQueryMembers}
                selectedQueryMembers={selectedQueryMembers}
                onToggleSection={onToggleSection}
                onMemberChange={updateMember}
                state={state}
              />
            )}
          </Collapse>
          <Collapse
            bordered={false}
            activeKey={collapseState.activePanelKey}
            className={s.root}
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            openAnimation={{
              appear: () => { },
              enter: () => { },
            }}
          >
            {children}
          </Collapse>
        </div>
      </Col>
    </Row>
  );
};

ExploreWorkspace.propTypes = {
  params: PropTypes.shape({
    explorationId: PropTypes.string,
    tabId: PropTypes.string,
    chartId: PropTypes.string,
  }).isRequired,
  dataSource: PropTypes.object,
  loading: PropTypes.bool,
  header: PropTypes.element,
};

ExploreWorkspace.defaultProps = {
  dataSource: {},
  loading: false,
  header: null,
};

export default ExploreWorkspace;
