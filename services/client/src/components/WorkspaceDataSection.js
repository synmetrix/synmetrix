/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSetState } from 'ahooks';

import { Row, Col, Button, Icon, Collapse, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';
import cx from 'classnames';

import usePermissions from 'hooks/usePermissions';
import useAnalyticsQueryMembers from 'hooks/useAnalyticsQueryMembers';

import ComponentSwitcher from 'components/ComponentSwitcher';
import PopoverButton from 'components/PopoverButton';
import SimpleForm from 'components/SimpleForm';
import PrismCode from 'components/PrismCode';
import TableView, { cellRenderer } from 'components/TableView';
import SavePinnedItemButton from 'components/SavePinnedItemButton';

import genName from 'utils/genName';

import s from './ExploreWorkspace.module.css';

const { Panel } = Collapse;
const noop = () => { };

const WorkspaceDataSection = (props) => {
  const { t } = useTranslation();
  const { fallback: querySettingsFallback } = usePermissions({ scope: 'explore/workspace/querySettings' });

  const {
    width,
    height,
    onToggleSection,
    onSectionChange,
    onExec,
    onQueryChange,
    disabled,
    state: workspaceState,
    queryState,
    explorationRowId,
    isActive,
    selectedQueryMembers,
    disableSectionChange,
    disableSettings,
    className,
    emptyDesc,
    ...restProps
  } = props;

  const [currState, updateState] = useSetState({
    section: workspaceState.dataSection,
  });

  useEffect(
    () => {
      updateState({
        section: workspaceState.dataSection,
      });
    },
    [updateState, workspaceState.dataSection]
  );

  const { baseMembers: { index: membersIndex } } = useAnalyticsQueryMembers({ 
    selectedQueryMembers,
    settings: queryState?.settings,
  })

  const tableEmptyDesc = emptyDesc || t('Select dimensions & measures from left menu and run query');


  const Table = useMemo(
    () => {
      const {
        order,
        hitLimit,
        limit,
        offset = 0,
        error,
        rows,
        columns,
        loading,
        progress,
        skippedMembers,
        settings,
      } = queryState;

      const messages = [];

      if (hitLimit && !querySettingsFallback) {
        messages.push({
          type: 'warning',
          text: `You hit the limit. Your dataset is more than ${limit} rows. Try to adjust your query.`,
        });
      }

      if (skippedMembers.length) {
        messages.push({
          type: 'warning',
          text: `Skipped ${skippedMembers.join(', ')}`
        });
      }

      if (progress?.error) {
        messages.push({
          type: 'error',
          text: progress.error
        });
      }

      if (error) {
        messages.push({
          type: 'warning',
          text: 'error',
        });
      }

      return (
        <TableView
          messages={messages}
          loading={loading}
          loadingProgress={progress}
          width={width}
          height={height}
          columns={columns}
          data={rows}
          sortBy={order}
          cellRenderer={args => cellRenderer(args, membersIndex)}
          orderByFn={arr => arr}
          onSortUpdate={onQueryChange('order')}
          emptyDesc={tableEmptyDesc}
          settings={settings}
          footer={tableRows => (
            <Row type="flex" style={{ marginLeft: 10, marginTop: 10, fontSize: '0.9em' }}>
              <Col xs={12}>
                {t('Shown')}: {tableRows.length} / {limit}, {t('Offset')}: {offset}, {t('Columns')}: {columns.length}
              </Col>
              <Col xs={12} style={{ textAlign: 'right' }}>
                <CSVLink data={rows} filename={`exploration-${genName(5)}.csv`}>
                  Download Shown CSV &nbsp;
                  <Icon type="download" />
                </CSVLink>
              </Col>
            </Row>
          )}
        />
      );
    },
    [queryState, querySettingsFallback, width, height, onQueryChange, tableEmptyDesc, t, membersIndex]
  );

  const Sql = useMemo(
    () => {
      const {
        rawSql = {},
      } = queryState;

      return (
        <PrismCode
          lang="sql"
          code={rawSql.sql || ''}
        />
      );
    },
    [queryState]
  );

  const {
    limit,
    offset = 0,
    settings: {
      hideCubeNames,
      hideIndexColumn
    }
  } = queryState;

  const inline = onToggleSection === noop;

  const onRadioClick = (e) => {
    const { target } = e;

    updateState({
      section: target.value,
    });

    onSectionChange(e);
  };

  const newSpec = {
    columns: queryState.columns,
    data: queryState.rows
  };

  const formConfig = {
    rows: {
      section: t('Query'),
      label: t('Rows Limit'),
      display: 'text',
      type: 'number',
      step: 1,
      min: 0,
      default: limit,
      span: 12,
    },
    offset: {
      section: t('Query'),
      label: t('Additional Offset'),
      display: 'text',
      type: 'number',
      step: 1,
      min: 0,
      default: offset,
      span: 12,
    },
    hideCubeNames: {
      section: t('Settings'),
      label: t('Hide Cube Names'),
      display: 'checkbox',
      size: 'small',
      span: 12,
      checked: hideCubeNames,
    },
    hideIndexColumn: {
      section: t('Settings'),
      label: t('Hide Index Column'),
      display: 'checkbox',
      size: 'small',
      span: 12,
      checked: hideIndexColumn,
    }
  };

  const onSubmit = (values) => {
    if (values.rows !== limit) {
      onQueryChange('limit', values.rows);
    }
    if (values.offset !== offset) {
      onQueryChange('offset', values.offset);
    }
    if (values.hideCubeNames !== hideCubeNames) {
      onQueryChange('hideCubeNames', values.hideCubeNames);
    }
    if (values.hideIndexColumn !== hideIndexColumn) {
      onQueryChange('hideIndexColumn', values.hideIndexColumn);
    }
  };

  return (
    <Panel
      {...restProps}
      className={cx(s.panel, s.panelNoBorderBottom, className)}
      isActive={isActive}
      header={(
        <>
          {(!inline) && (
            <>
              <Button type="dashed" size="small" onClick={() => onToggleSection('dataSec')}>
                {t('Data')}
              </Button>
            </>
          )}

          {!querySettingsFallback && (
            <div className={cx({
              [s.panelHeaderComponent]: !inline
            })}
            >
              <Radio.Group
                value={currState.section}
                onChange={onRadioClick}
                disabled={disableSectionChange}
                className={s.buttonGroup}
                size="small"
              >
                <Radio.Button value="results">{t('Results')}</Radio.Button>
                <Radio.Button value="sql">{t('SQL')}</Radio.Button>
              </Radio.Group>

              <Button type={!disabled ? 'primary' : 'default'} size="small" style={{ marginLeft: 15 }} onClick={onExec}>
                {t('Run Query')}
                <Icon type="right" />
              </Button>

              {!disableSettings && (
                <div style={{ display: 'inline-block', marginLeft: 10 }}>
                  <PopoverButton
                    iconType="setting"
                    style={{ borderColor: 'transparent', boxShadow: 'none', color: 'rgba(0, 0, 0, 0.25)' }}
                    placement="bottom"
                    content={(
                      <div style={{ maxWidth: 350 }}>
                        <SimpleForm
                          config={formConfig}
                          onSubmit={onSubmit}
                          autoSubmit
                        />
                      </div>
                    )}
                    trigger="click"
                  />
                </div>
              )}
              <div style={{ display: 'inline-block' }}>
                <SavePinnedItemButton
                  type='raw-table'
                  spec={newSpec}
                  explorationRowId={explorationRowId}
                  disabled={!isActive}
                />
              </div>
            </div>
          )}
        </>
      )}
    >
      <ComponentSwitcher
        activeItemIndex={currState.section === 'sql' ? 1 : 0}
        items={[
          Table,
          Sql,
        ]}
      />
    </Panel>
  );
};

WorkspaceDataSection.propTypes = {
  className: PropTypes.any,
  emptyDesc: PropTypes.string,
  onToggleSection: PropTypes.func,
  onSectionChange: PropTypes.func,
  onExec: PropTypes.func,
  onQueryChange: PropTypes.func,
  disabled: PropTypes.bool,
  disableSectionChange: PropTypes.bool,
  disableSettings: PropTypes.bool,
  selectedQueryMembers: PropTypes.shape({
    measures: PropTypes.array,
    dimensions: PropTypes.array,
    segments: PropTypes.array,
    filters: PropTypes.array,
  }).isRequired,
  state: PropTypes.shape({
    dataSection: PropTypes.string,
  }),
  queryState: PropTypes.shape({
    order: PropTypes.array,
    hitLimit: PropTypes.bool,
    limit: PropTypes.number,
    offset: PropTypes.number,
    rawSql: PropTypes.object,
    error: PropTypes.object,
    progress: PropTypes.object,
    rows: PropTypes.array,
    columns: PropTypes.array,
    loading: PropTypes.bool,
    settings: PropTypes.object,
    skippedMembers: PropTypes.array,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  explorationRowId: PropTypes.string,
  isActive: PropTypes.bool
};

WorkspaceDataSection.defaultProps = {
  className: undefined,
  emptyDesc: undefined,
  onToggleSection: noop,
  onSectionChange: noop,
  onExec: noop,
  onQueryChange: noop,
  disabled: false,
  disableSectionChange: false,
  disableSettings: false,
  state: {},
  queryState: {},
  width: 300,
  height: 300,
  explorationRowId: null,
  isActive: true
};

export default WorkspaceDataSection;
