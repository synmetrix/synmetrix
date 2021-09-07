import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Icon, Popconfirm, message } from 'antd';

import GridLayout from 'react-grid-layout';

import equals from 'utils/equals';

import Loader from 'components/Loader';
import ContentHeader from 'components/ContentHeader';
import PinnedItem from 'components/PinnedItem';
import EditableField from 'components/EditableField';
import ErrorFound from 'components/ErrorFound';

import useLocation from 'hooks/useLocation';
import useCheckResponse from 'hooks/useCheckResponse';
import useDashboards from 'hooks/useDashboards';
import usePermissions from 'hooks/usePermissions';
import useAppSettings from 'hooks/useAppSettings';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import s from './Dashboards.module.css';

export const rowHeight = 30;

const Dashboards = ({ match }) => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const { params } = match;
  const { rowId } = params;

  const {
    all: dashboards,
    current: dashboard,
    onChange,
    getItemGridData,
    queries: {
      allData,
      execQueryAll,
      currentData,
      execQueryCurrent,
    },
    mutations: {
      updateMutation,
      execUpdateMutation,
      deleteMutation,
      execDeleteMutation,
    },
  } = useDashboards({
    params: {
      editId: rowId,
    },
    pauseQueryAll: false,
  });

  const onDelete = async (res) => {
    if (res) {
      execQueryAll();

      if (dashboards.length - 1 <= 0) {
        const firstDataSource = allData?.data?.allDatasources?.nodes?.[0]?.rowId;
        setLocation(withAuthPrefix(`/explore/${firstDataSource}`));
      } else {
        const firstDashboard = allData?.data?.allDashboards?.nodes?.filter(
          dash => dash.id !== res.deleteDashboard.deletedDashboardId
        )?.[0]?.rowId;

        setLocation(withAuthPrefix(`/dashboards/${firstDashboard}`));
      }
    }
  };

  const onUpdate = res => {
    if (res) {
      execQueryCurrent();
      execQueryAll();
    }
  };

  useCheckResponse(updateMutation, onUpdate, {
    successMessage: null,
  });

  useCheckResponse(deleteMutation, onDelete, {
    successMessage: t('Successfully deleted'),
  });

  const onLayoutChange = (newLayout) => {
    let parsedLayout;

    try {
      parsedLayout = JSON.parse(JSON.stringify(newLayout));
    } catch (err) {
      message.error(err.toString());
      return null;
    }

    if (!newLayout || equals(dashboard.layout, parsedLayout)) {
      return null;
    }

    return execUpdateMutation({ 
      pk_columns: {
        id: dashboard.id,
      },
      _set: {
        name: dashboard.name,
        layout: newLayout,
      },
    });
  };


  const onRename = (id, value) => {
    const { name } = value || {};

    if (dashboard?.name && name === dashboard?.name) {
      return null;
    }

    return execUpdateMutation({ 
      pk_columns: {
        id,
      },
      _set: {
        name,
      },
    });
  };

  const { fallback } = usePermissions({ scope: 'dashboards' });
  if (fallback) {
    return fallback;
  }

  if (!dashboard.id && !currentData.fetching) {
    return <ErrorFound status={404} />;
  }

  const nameLoading = updateMutation.fetching;

  return (
    <>
      <Loader spinning={currentData.fetching}>
        <ContentHeader
          rowId={dashboard.id}
          title={dashboard?.id && (
            <Loader spinning={nameLoading}>
              <div style={{ lineHeight: '32px', whiteSpace: 'nowrap' }}>
                <EditableField
                  id={dashboard?.id}
                  currentValue={dashboard?.name || ''}
                  renameFunc={onRename}
                  style={{ minWidth: '50px', fontWeight: '500' }}
                />
              </div>
            </Loader>
          )}
          confirmTitle={t('Are you sure delete this dashboard?')}
          entities={dashboards}
          onChange={onChange}
          extra={dashboard.id && (
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <Popconfirm
                title={t('Are you sure delete this dashboard?')}
                onConfirm={() => execDeleteMutation({ id: dashboard.id })}
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
          {dashboard?.pinned_items?.map((item) => (
            <div className={s.item} key={item.id} data-grid={getItemGridData(item.id)}>
              <PinnedItem
                rowId={item.id}
                updateDashboard={execQueryCurrent}
              />
            </div>
          ))}
        </GridLayout>
      </div>
    </>
  );
};

Dashboards.propTypes = {
  match: PropTypes.object,
};

Dashboards.defaultProps = {
  match: {},
};

export default Dashboards;
