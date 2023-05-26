import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import TableList from 'components/TableList';
import formatDistanceToNow from '../utils/formatDistanceToNow';

const LogsTable = ({ logs, pagination, loading, onClickRow, onPageChange }) => {
  const columns = [
    {
      title: 'Datasource',
      dataIndex: ['datasource', 'name'],
      key: 'datasource_name',
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      render: (_, record) => record.event_logs?.find(e => e.path)?.path,
    },
    {
      title: 'Events',
      dataIndex: ['event_logs_aggregate', 'aggregate', 'count'],
      key: 'events_count',
    },
    {
      title: 'Creator',
      dataIndex: ['user', 'display_name'],
      key: 'display_name',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Start time',
      dataIndex: 'start_time',
      key: 'start_time',
    },
    {
      title: 'End time',
      dataIndex: 'end_time',
      key: 'end_time',
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
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={loading}
          rowKey={row => row.id}
          columns={columns}
          dataSource={logs}
          pagination={pagination}
          onChange={onPageChange}
          onRow={(record) => ({ onClick: () => onClickRow(record.id) })}
        />
      </Col>
    </Row>
  ];
};

LogsTable.propTypes = {
  data: PropTypes.array,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  onClickRow: PropTypes.func,
  onPageChange: PropTypes.func,
};

LogsTable.defaultProps = {
  data: [],
  pagination: {},
  loading: false,
  onClickRow: () => {},
  onPageChange: () => {},
};

export default LogsTable;
