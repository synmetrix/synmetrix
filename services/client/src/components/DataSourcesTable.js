import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, message } from 'antd';

import useDataSources from 'hooks/useDataSources';
import useTableState from 'hooks/useTableState';
import useDataSourcesSubscription from 'hooks/useDataSourcesSubscription';

import DataSourceModal from 'components/DataSourceModal';
import TableList from 'components/TableList';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const DataSourcesTable = ({ editId, onModalClose, onModalOpen }) => {
  const initModal = id => ({
    editId: id,
    visibleModal: !!id,
  });

  const [state, setState] = useState(initModal(editId));

  useEffect(
    () => setState(initModal(editId)),
    [editId]
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
    all: dataSources,
    totalCount,
    current: dataSource,
    queries: {
      allData: {
        fetching: allLoading,
      },
      currentData: {
        fetching: currentLoading
      },
      executeQueryAll,
    },
    mutations: {
      editMutation, mExecuteEditMutation,
    }
  } = useDataSources({ editId: state.editId, paginationVars });

  useDataSourcesSubscription(() => {
    executeQueryAll({ requestPolicy: 'network-only' });
  });

  const onDataSourceOpen = (record) => {
    onModalOpen(record);
    setState(prev => ({ ...prev, editId: record.rowId, visibleModal: true }));
  };

  const onDataSourceClose = () => {
    onModalClose(state.editId);
    setState(prev => ({ ...prev, editId: null, visibleModal: false }));
  };

  const onSave = (_record, values) => {
    mExecuteEditMutation(values);
  };

  const onDelete = () => {
    onDataSourceClose();
    // https://formidable.com/open-source/urql/docs#refetching-data
    executeQueryAll({ requestPolicy: 'cache-and-network' });
  };

  useEffect(
    () => {
      if (editMutation.data) {
        message.success('Saved');
      }

      if (editMutation.error) {
        message.error('Something went wrong');
      }
    },
    [editMutation]
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'dbType',
      key: 'dbType',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, record) => {
        const updatedAt = formatDistanceToNow(record.updatedAt);
        return updatedAt;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => {
        const createdAt = formatDistanceToNow(record.createdAt);
        return createdAt;
      },
    },
  ];

  return [
    <DataSourceModal
      key="modal"
      title={dataSource.name || ''}
      dataSource={dataSource}
      onCancel={onDataSourceClose}
      visible={state.visibleModal}
      loading={currentLoading || editMutation.fetching}
      onSave={onSave}
      onDelete={onDelete}
      initialValues={{
        rowId: editId,
      }}
    />,
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={allLoading}
          rowKey={row => row.rowId}
          columns={columns}
          dataSource={Object.values(dataSources)}
          onRow={record => ({
            onClick: () => onDataSourceOpen(record),
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

DataSourcesTable.propTypes = {
  editId: PropTypes.string,
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
};

DataSourcesTable.defaultProps = {
  editId: null,
  onModalOpen: () => { },
  onModalClose: () => { },
};

export default DataSourcesTable;
