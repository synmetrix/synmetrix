import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Row, Col, message } from 'antd';

import useSources from 'hooks/useSources';
import useTableState from 'hooks/useTableState';
import useCheckResponse from 'hooks/useCheckResponse';

import DataSourceModal from 'components/DataSourceModal';
import TableList from 'components/TableList';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const DataSourcesTable = ({ editId, onModalClose, onModalOpen }) => {
  const { t } = useTranslation();
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

  console.log(state);
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
      execQueryAll,
    },
    mutations: {
      updateMutation, execUpdateMutation,
    },
    subscription,
  } = useSources({
    params: {
      editId: state.editId,
    },
    pagination: paginationVars,
    disableSubscription: false,
  });

  // useEffect(() => {
  //   if (subscription.data) {
  //     execQueryAll({ requestPolicy: 'network-only' });
  //   }
  // }, [execQueryAll, subscription.data]);

  const onDataSourceOpen = (record) => {
    onModalOpen(record);
    setState(prev => ({ ...prev, editId: record.id, visibleModal: true }));
  };

  const onDataSourceClose = () => {
    onModalClose(state.editId);
    setState(prev => ({ ...prev, editId: null, visibleModal: false }));
  };

  const onSave = (_record, values) => {
    execUpdateMutation({ 
      pk_columns: state.editId,
      _set: values,
    });
  };

  const onDelete = () => {
    onDataSourceClose();
    execQueryAll({ requestPolicy: 'cache-and-network' });
  };

  useCheckResponse(updateMutation, () => {}, {
    successMessage: t('Saved')
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'db_type',
      key: 'db_type',
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
    <DataSourceModal
      key="modal"
      title={dataSource.name || ''}
      dataSource={dataSource}
      onCancel={onDataSourceClose}
      visible={state.visibleModal}
      loading={currentLoading || updateMutation.fetching}
      onSave={onSave}
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
