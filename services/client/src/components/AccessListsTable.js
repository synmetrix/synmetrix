import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'antd';

import TableList from 'components/TableList';
import AccessListDatasource from 'components/AccessListDatasource';

import useTableState from 'hooks/useTableState';
import useAccessLists from 'hooks/useAccessLists';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const AccessListsTable = ({ totalCount, loading, onModalOpen, onRemoveAccessList }) => {
  const { t } = useTranslation();

  const {
    tableState: {
      pageSize,
      currentPage,
      paginationVars,
    },
    onPageChange,
  } = useTableState({});

  const {
    all: accessLists,
    mutations: {
      deleteMutation, execDeleteMutation,
    }
  } = useAccessLists({
    pauseQueryAll: false,
    disableSubscription: false,
    pagination: paginationVars,
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Access to data source',
      dataIndex: 'access',
      key: 'access',
      render: (_, record) => {
        const count = Object.keys(record?.access_list?.datasources || {}).length;
        return `${count} Data sources`;
      }
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
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (_, record) => {
        const updatedAt = formatDistanceToNow(record.updated_at);
        return updatedAt;
      },
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button onClick={() => onModalOpen(record.id)}>
            {t('Edit')}
          </Button>
          <Button onClick={() => execDeleteMutation({ id: record.id })}>
            {t('Delete')}
          </Button>
        </>
      ),
    }
  ];

  const datasource = useMemo(() => accessLists.map(accessList => {
    const datasources = Object.entries(accessList?.access_list?.datasources || {}).map(([datasourceId, val]) => (
      <AccessListDatasource key={datasourceId} datasourceId={datasourceId} datasourcePermissions={val?.models} />
    ));

    return {
      ...accessList,
      datasources,
    };
  }), [accessLists]);

  return [
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={loading}
          rowKey={row => row.id}
          columns={columns}
          dataSource={datasource}
          pagination={{
            pageSize,
            total: totalCount,
            current: currentPage,
          }}
          onChange={onPageChange}
          expandedRowRender={record => record?.datasources || []}
        />
      </Col>
    </Row>
  ];
};

AccessListsTable.propTypes = {
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  onModalOpen: PropTypes.func,
  onRemoveAccessList: PropTypes.func,
};

AccessListsTable.defaultProps = {
  totalCount: 0,
  loading: false,
  onModalOpen: () => {},
  onRemoveAccessList: () => {},
};

export default AccessListsTable;
