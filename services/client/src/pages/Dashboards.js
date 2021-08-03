import React, { useMemo, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Empty, Icon, message, Popconfirm } from 'antd';

import { getOr } from 'unchanged';

import GridLayout from 'react-grid-layout';
import useLocation from 'wouter/use-location';

import equals from 'utils/equals';
import Loader from 'components/Loader';
import ContentHeader from 'components/ContentHeader';
import PinnedItem from 'components/PinnedItem';
import EditableField from 'components/EditableField';
import ErrorFound from 'components/ErrorFound';

import useCheckResponse from 'hooks/useCheckResponse';
import useDashboards from 'hooks/useDashboards';
import useAuth from 'hooks/useAuth';
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
    setLastUsedDashboardId,
  } = useAuth();

  const {
    all: dashboards,
    current: dashboard,
    onChange,
    getItemGridData,
    queries: {
      allData,
      executeQueryAll,
      currentData,
      executeQueryCurrent
    },
    mutations: {
      updateMutation, mExecUpdateMutation,
      deleteMutation, mExecuteDeleteMutation
    },
  } = useDashboards({ editId: rowId, pauseQueryAll: false });

  useEffect(() => {
    setLastUsedDashboardId(dashboard.rowId);
  }, [dashboard?.rowId]);

  const onDelete = async (res, err) => {
    if (res) {
      await executeQueryAll();

      if (dashboards.length - 1 <= 0) {
        const firstDataSource = allData?.data?.allDatasources?.nodes?.[0]?.rowId;
        setLocation(`/d/explore/${firstDataSource}`);
      } else {
        const firstDashboard = allData?.data?.allDashboards?.nodes?.[0]?.rowId;
        setLocation(`/d/dashboards/${firstDashboard}`);
      }

      setLastUsedDashboardId(null);
    }
  };

  useCheckResponse(updateMutation, () => {}, {
    successMessage: null,
  });

  useCheckResponse(deleteMutation, onDelete, {
    successMessage: t('Successfully deleted'),
  });

  const pinnedItems = useMemo(() => (
    getOr([], 'pinnedItemsByDashboardId.nodes', dashboard)
  ), [dashboard]);

  const onLayoutChange = (newLayout) => {
    mExecUpdateMutation(dashboard.id, { name: dashboard.name, layout: newLayout });
  };

  const onRename = (id, value) => {
    if (value.name !== dashboard.name) {
      mExecUpdateMutation(id, value);
    }
  };

  const { fallback } = usePermissions({ scope: 'dashboards' });
  if (fallback) {
    return fallback;
  }

  if (!dashboard.rowId && !currentData.fetching) {
    return <ErrorFound status={404} />;
  }

  const nameLoading = updateMutation.fetching;

  return (
    <>
      <Loader spinning={currentData.fetching}>
        <ContentHeader
          rowId={dashboard.rowId}
          title={dashboard?.rowId && (
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
                onConfirm={() => mExecuteDeleteMutation(dashboard.id)}
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
