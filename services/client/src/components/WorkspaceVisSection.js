import React from 'react';
import PropTypes from 'prop-types';

import { Button, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import ExploreVisualizations from 'components/ExploreVisualizations';
import SavePinnedItemButton from 'components/SavePinnedItemButton';

import useXState from 'hooks/useXState';

import s from './ExploreWorkspace.module.css';

const { Panel } = Collapse;

const WorkspaceVisSection = (props) => {
  const { t } = useTranslation();
  const [sectionState, _, setSectionState] = useXState({
    spec: {},
    tabsConfig: {},
    formConfig: [],
    formValues: {},
    layerId: 1,
  });

  const {
    width,
    explorationRowId,
    queryState,
    isQueryChanged,
    onToggleSection,
    state,
    selectedQueryMembers,
    availableQueryMembers,
    className,
    isActive,
    chartId,
    ...restProps
  } = props;

  const {
    rows,
    settings,
  } = queryState;

  return (
    <Panel
      {...restProps}
      className={cx(s.panel, className)}
      isActive={isActive}
      header={(
        <>
          <Button type="dashed" size="small" onClick={() => onToggleSection('visSec')}>
            {t('Visualizations')}
          </Button>
          <div style={{ display: 'inline-block', marginLeft: 5 }}>
            <SavePinnedItemButton
              spec={sectionState.spec}
              specConfig={{
                formConfig: sectionState.formConfig,
                formValues: sectionState.formValues,
                tabsConfig: sectionState.tabsConfig,
                layerId: sectionState.layerId,
              }}
              type="chart"
              explorationRowId={explorationRowId}
              disabled={!isActive}
            />
          </div>
        </>
      )}
    >
      <ExploreVisualizations
        width={width}
        availableQueryMembers={availableQueryMembers}
        selectedQueryMembers={selectedQueryMembers}
        disabled={!!isQueryChanged}
        rows={rows}
        sectionState={sectionState}
        setSectionState={setSectionState}
        settings={settings}
        emptyDesc={t('Select dimensions & measures from the left menu and run the query')}
        chartId={chartId}
      />
    </Panel>
  );
};

WorkspaceVisSection.propTypes = {
  className: PropTypes.any,
  onToggleSection: PropTypes.func.isRequired,
  availableQueryMembers: PropTypes.object.isRequired,
  selectedQueryMembers: PropTypes.shape({
    measures: PropTypes.array,
    dimensions: PropTypes.array,
    segments: PropTypes.array,
    filters: PropTypes.array,
  }).isRequired,
  explorationRowId: PropTypes.number,
  isQueryChanged: PropTypes.bool,
  width: PropTypes.number,
  state: PropTypes.shape({
    filtersCount: PropTypes.number,
  }),
  queryState: PropTypes.shape({
    rows: PropTypes.array,
    settings: PropTypes.object
  }),
  isActive: PropTypes.bool,
  chartId: PropTypes.string,
};

WorkspaceVisSection.defaultProps = {
  className: undefined,
  explorationRowId: null,
  isQueryChanged: false,
  width: 300,
  state: {},
  queryState: {},
  isActive: true,
  chartId: null,
};

export default WorkspaceVisSection;
