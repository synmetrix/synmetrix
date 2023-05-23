import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import TableList from 'components/TableList';
import formatDistanceToNow from '../utils/formatDistanceToNow';

const LogsTable = ({ logs, sort, pagination, loading, onClickRow, onPageChange }) => {
  const datasource = useMemo(() => {
    const data = (logs || []).map(request => {
      const path = request.event_logs?.find(e => e.path)?.path;

      const sortedLogs = request?.event_logs?.sort((a, b) => a.timestamp > b.timestamp);
      const firstTimestamp = sortedLogs?.[0]?.timestamp;
      const lastTimestamp = sortedLogs?.[sortedLogs.length - 1]?.timestamp;

      const duration = new Date(lastTimestamp) - new Date(firstTimestamp);

      return {
        ...request,
        path,
        duration,
      };
    });

    return data.sort((a, b) => sort === 'asc' ? a.duration > b.duration : a.duration < b.duration);
  }, [logs, sort]);

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
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
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
          dataSource={datasource}
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
  sort: PropTypes.string,
  pagination: PropTypes.object,
  loading: PropTypes.bool,
  onClickRow: PropTypes.func,
  onPageChange: PropTypes.func,
};

LogsTable.defaultProps = {
  data: [],
  sort: 'asc',
  pagination: {},
  loading: false,
  onClickRow: () => {},
  onPageChange: () => {},
};

export default LogsTable;
