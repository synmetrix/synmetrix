import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSetState , useTrackedEffect } from 'ahooks';

import { Row, Col } from 'antd';

import equals from 'utils/equals';
import useAlerts from 'hooks/useAlerts';
import useTableState from 'hooks/useTableState';
import useCurrentUserState from 'hooks/useCurrentUserState';

import AlertModal from 'components/AlertModal';
import TableList from 'components/TableList';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const AlertTable = ({ editId, onModalClose, onModalOpen }) => {
  const initModal = id => ({
    editId: id,
    visibleModal: !!id,
  });

  const [state, setState] = useSetState(initModal(editId));
  const { currentUserState: currentUser } = useCurrentUserState();

  useEffect(
    () => setState(initModal(editId)),
    [editId, setState]
  );

  const {
    tableState: {
      pageSize,
      currentPage,
      paginationVars,
    },
    onPageChange,
  } = useTableState({});

  const {
    all: alerts,
    totalCount,
    current: alert,
    queries: {
      allData: {
        fetching: allLoading,
      },
      currentData: {
        fetching: currentLoading
      },
      execQueryAll,
      execQueryCurrent,
    },
  } = useAlerts({
    params: {
      editId: state.editId,
    },
    pagination: paginationVars,
    pauseQueryAll: false,
  });

  useTrackedEffect((changes, previousDeps, currentDeps) => {
    const prevData = previousDeps?.[0];
    const currData = currentDeps?.[0];

    let dataDiff = false;
    if (!prevData || !currData) {
      dataDiff = false;
    } else {
      dataDiff = !equals(prevData, currData);
    }

    if (dataDiff) {
      execQueryAll({ requestPolicy: 'network-only' });
    }
  }, [currentUser.alerts, execQueryAll]);

  const onAlertOpen = (record) => {
    onModalOpen(record);
    setState({ editId: record.id, visibleModal: true });
    execQueryCurrent();
  };

  const onAlertClose = () => {
    onModalClose();
    setState({ editId: null, visibleModal: false });
  };

  const onDelete = () => {
    onAlertClose();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Delivery Type',
      dataIndex: 'delivery_type',
      key: 'delivery_type',
    },
    {
      title: 'Creator',
      dataIndex: ['user', 'display_name'],
      key: 'display_name',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_, record) => {
        const updatedAt = formatDistanceToNow(record.updated_at);
        return updatedAt;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => {
        const createdAt = formatDistanceToNow(record.created_at);
        return createdAt;
      },
    },
  ];

  return [
    <AlertModal
      key="modal"
      title={alert.name || ''}
      report={alert}
      onCancel={onAlertClose}
      visible={state.visibleModal}
      loading={currentLoading}
      onDelete={onDelete}
      initialValues={{
        id: editId,
      }}
    />,
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={allLoading}
          rowKey={row => row.id}
          columns={columns}
          dataSource={Object.values(alerts)}
          onRow={record => ({
            onClick: () => onAlertOpen(record),
          })}
          pagination={{
            pageSize,
            total: totalCount,
            current: currentPage,
          }}
          onChange={onPageChange}
        />
      </Col>
    </Row>
  ];
};

AlertTable.propTypes = {
  editId: PropTypes.string,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
};

AlertTable.defaultProps = {
  editId: null,
  onModalOpen: () => { },
  onModalClose: () => { },
};

export default AlertTable;
