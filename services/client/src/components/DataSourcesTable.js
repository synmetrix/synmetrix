import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSetState, useTrackedEffect } from 'ahooks';


import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'antd';

import equals from 'utils/equals';
import useSources from 'hooks/useSources';
import useTableState from 'hooks/useTableState';
import useCheckResponse from 'hooks/useCheckResponse';
import useCurrentUserState from 'hooks/useCurrentUserState';

import DataSourceModal from 'components/DataSourceModal';
import TableList from 'components/TableList';
import { CUBEJS_MYSQL_API_URL, CUBEJS_PG_API_URL } from '../hooks/useAppSettings';
import useSQLCredentials from '../hooks/useSQLCredentials';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const DataSourcesTable = ({ editId, onModalClose, onModalOpen }) => {
  const { t } = useTranslation();
  const initModal = id => ({
    editId: id,
    visibleModal: !!id,
  });

  const [state, setState] = useSetState(initModal(editId));
  const { currentUserState: currentUser } = useCurrentUserState();

  const { 
    mutations: {
      deleteMutation: deleteSqlCredential,
      execDeleteMutation: execDeleteSqlCredential,
    }
  } = useSQLCredentials();

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
      execQueryCurrent,
    },
    mutations: {
      updateMutation, execUpdateMutation,
    },
  } = useSources({
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
  }, [currentUser.datasources, execQueryAll]);

  const onDataSourceOpen = (record) => {
    onModalOpen(record);
    setState({ editId: record.id, visibleModal: true });
    execQueryCurrent();
  };

  const onDataSourceClose = () => {
    onModalClose();
    setState({ editId: null, visibleModal: false });
  };

  const onSave = (_record, values) => {
    execUpdateMutation({
      pk_columns: { id: state.editId },
      _set: values,
    });
  };

  const onDelete = () => {
    onDataSourceClose();
  };

  useCheckResponse(updateMutation, () => { }, {
    successMessage: t('Saved')
  });

  useCheckResponse(deleteSqlCredential, () => { }, {
    successMessage: t('Deleted')
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

  const expandedTableColumns = [
    {
      title: 'PG Host',
      dataIndex: 'pg_host',
      key: 'pg_host',
      render: () => CUBEJS_MYSQL_API_URL,
    },
    {
      title: 'MySQL Host',
      dataIndex: 'mysql_host',
      key: 'mysql_host',
      render: () => CUBEJS_PG_API_URL,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Created by',
      dataIndex: 'user_id',
      key: 'user_id',
      render: (_, record) => record?.user?.display_name,
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
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <Button style={{ padding: 0 }} type="link" onClick={() => execDeleteSqlCredential({ id: record.id })}>
            Delete
          </Button>
        );
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
          expandedRowRender={record => (
            <TableList
              columns={expandedTableColumns}
              pagination={false}
              rowKey={row => row.id}
              dataSource={dataSources?.find(({ id }) => id === record.id)?.sql_credentials || []}
              locale={{ emptyText: t('No attached SQL interfaces') }}
              noEmptyImage
            />
          )}
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
