import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'antd';

import useTableState from 'hooks/useTableState';

import TableList from 'components/TableList';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const RolesTable = ({ roles, totalCount, loading, onModalOpen }) => {
  const { t } = useTranslation();

  const {
    tableState: {
      pageSize,
      currentPage,
      paginationVars,
    },
    onPageChange,
  } = useTableState({});

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
        const count = Object.keys(record?.datasources || {}).length;
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
          <Button onClick={() => {}}>
            {t('Delete')}
          </Button>
        </>
      ),
    }
  ];

  const expandedTableColumns = [
    {
      dataIndex: 'id', // ?
      key: 'id', // ?
    },
    // {
    //   dataIndex: 'access_type',
    //   key: 'access_type',
    // },
  ];

  const datasource = useMemo(() => roles.map(role => ({
    ...role,
    datasources: Object.entries(role?.datasources || {}).map(([datasourceId, val]) => ({ id: datasourceId, ...val })),
  })), [roles]);

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
          expandedRowRender={record => (
            <TableList
              columns={expandedTableColumns}
              pagination={false}
              rowKey={row => row.id}
              dataSource={record?.datasources || []}
              noEmptyImage
            />
          )}
        />
      </Col>
    </Row>
  ];
};

RolesTable.propTypes = {
  roles: PropTypes.array,
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  onModalOpen: PropTypes.func,
};

RolesTable.defaultProps = {
  roles: [],
  totalCount: 0,
  loading: false,
  onModalOpen: () => {},
};

export default RolesTable;
