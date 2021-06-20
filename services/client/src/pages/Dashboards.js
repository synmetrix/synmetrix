import React, { useMemo, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Empty, Icon, message, Popconfirm } from 'antd';

import { getOr } from 'unchanged';

import GridLayout from 'react-grid-layout';

import Loader from 'components/Loader';
import ContentHeader from 'components/ContentHeader';
import PinnedItem from 'components/PinnedItem';
import EditableField from 'components/EditableField';
import ErrorFound from 'components/ErrorFound';

import useLocation from 'wouter/use-location';
import useDashboards from 'hooks/useDashboards';
import useGlobalStore from 'hooks/useGlobalStore';
import usePermissions from 'hooks/usePermissions';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import s from './Dashboards.module.css';

export const rowHeight = 30;

const Dashboards = ({ params }) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const basePath = '/d/dashboards';
  const { rowId } = params;

  const {
    setDashboardsCount,
    lastUsedDataSourceId,
    setLastUsedDashboardId,
  } = useGlobalStore();

  const [nameLoading, setNameLoading] = useState(false);

  const {
    all: dashboards,
    current: dashboard,
    onChange,
    getItemGridData,
    queries: {
      executeQueryAll,
      currentData, executeQueryCurrent
    },
    mutations: {
      updateMutation, mExecUpdateMutation,
      deleteMutation, mExecuteDeleteMutation
    },
  } = useDashboards({ editId: rowId, pauseQueryAll: false });

  const relocation = useCallback((nextRowId) => {
    setLocation(`${basePath}/${nextRowId}`);
    setLastUsedDashboardId(nextRowId);
  }, [setLastUsedDashboardId, setLocation]);

  const relocationExplore = useCallback(() => {
    setDashboardsCount(0);
    setLocation(`/d/explore/${lastUsedDataSourceId}`);
  }, [lastUsedDataSourceId, setDashboardsCount, setLocation]);

  const pinnedItems = useMemo(() => (
    getOr([], 'pinnedItemsByDashboardId.nodes', dashboard)
  ), [dashboard]);

  const onLayoutChange = (newLayout) => {
    mExecUpdateMutation(dashboard.id, { name: dashboard.name, layout: newLayout });
  };

  const onDelete = () => {
    mExecuteDeleteMutation(dashboard.id);
  };

  const onRename = (id, value) => {
    if (value.name !== dashboard.name) {
      setNameLoading(true);
      mExecUpdateMutation(id, value);
    }
  };

  useEffect(() => {
    if (dashboards.length) {
      setDashboardsCount(dashboards.length);
      setLastUsedDashboardId(rowId);
    }
  }, [dashboards.length, rowId, setDashboardsCount, setLastUsedDashboardId]);

  useEffect(() => {
    if (updateMutation.error) {
      message.error(updateMutation.error.message);
    } else if (updateMutation.data) {
      setNameLoading(false);
      updateMutation.data = null;
    }
  }, [updateMutation, updateMutation.data]);

  useEffect(() => {
    if (deleteMutation.error) {
      message.error(deleteMutation.error.message);
    }
    if (deleteMutation.data) {
      if (dashboards.length - 1) {
        const anyDashboard = dashboards.find(d => parseInt(d.rowId, 10) !== parseInt(rowId, 10));
        relocation(anyDashboard.rowId);
      } else {
        relocationExplore();
      }

      executeQueryAll();
      executeQueryCurrent();
      deleteMutation.data = null;
    }
  }, [dashboards, deleteMutation.data, deleteMutation.error, executeQueryAll, executeQueryCurrent, relocation, relocationExplore, rowId]);

  useEffect(() => {
    if (!dashboard.rowId && dashboards.length) {
      setLastUsedDashboardId(dashboards[0].rowId);
    }
  }, [dashboard.length, dashboard.rowId, dashboards, setLastUsedDashboardId]);

  const { fallback } = usePermissions({ scope: 'dashboards' });
  if (fallback) {
    return fallback;
  }

  if (!dashboard.rowId && !currentData.fetching) {
    return <ErrorFound status={404} />;
  }

  return (
    <>
      <Loader spinning={currentData.fetching}>
        <ContentHeader
          rowId={dashboard.rowId}
          title={(
            <Loader spinning={nameLoading}>
              <div style={{ lineHeight: '32px', whiteSpace: 'nowrap' }}>
                <EditableField
                  id={dashboard.id}
                  currentValue={dashboard.name}
                  renameFunc={onRename}
                  style={{ minWidth: '50px', fontWeight: '500' }}
                />
              </div>
            </Loader>
          )}
          confirmTitle={t('Are you sure delete this dashboard?')}
          entities={dashboards}
          onChange={onChange}
          extra={dashboard.rowId && (
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <Popconfirm
                title={t('Are you sure delete this dashboard?')}
                onConfirm={onDelete}
                okText={t('Yes')}
                okType="danger"
                cancelText={t('No')}
                placement="bottomRight"
              >
                <Icon className={s.closeButton} type='close' />
              </Popconfirm>
            </div>
          )}
        />
      </Loader>
      <div>
        <GridLayout
          cols={12}
          layout={dashboard.layout || []}
          onLayoutChange={onLayoutChange}
          rowHeight={rowHeight}
          draggableCancel=".ant-typography, .marks, .vega-actions"
          width={1800}
        >
          {pinnedItems.map((item) => (
            <div className={s.item} key={item.rowId} data-grid={getItemGridData(item.rowId)}>
              <PinnedItem
                rowId={item.rowId}
                updateDashboard={executeQueryCurrent}
              />
            </div>
          ))}
        </GridLayout>
      </div>
    </>
  );
};

Dashboards.propTypes = {
  params: PropTypes.object,
};

Dashboards.defaultProps = {
  params: {},
};

export default Dashboards;
