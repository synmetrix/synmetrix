import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'antd';

import useTableState from 'hooks/useTableState';

import TableList from 'components/TableList';

import formatDistanceToNow from '../utils/formatDistanceToNow';

const RolesTable = ({ roles, totalCount, loading }) => {
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Access to data source',
      dataIndex: 'access',
      key: 'access',
      render: (_, record) => {
        // length datasources
        const count = 5;
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
          <Button onClick={() => {}}>
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
      dataIndex: 'name', // ?
      key: 'name', // ?
    },
    {
      dataIndex: 'access_type',
      key: 'access_type',
    },
  ];

  return [
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={loading}
          rowKey={row => row.id}
          columns={columns}
          dataSource={roles}
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
              dataSource={roles?.find(({ id }) => id === record.id)?.datasources || []}
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
};

RolesTable.defaultProps = {
  roles: [],
  totalCount: 0,
  loading: false,
};

export default RolesTable;
