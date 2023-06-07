import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Col } from 'antd';

import TableList from 'components/TableList';
import formatTime from 'utils/formatTime';
import formatDistanceToNow from '../utils/formatDistanceToNow';

import s from './LogsTable.module.css';

const LogsTable = ({ logs, pagination, loading, onClickRow, onPageChange }) => {
  const datasource = useMemo(() => logs.map(l => {
    const startTime = formatTime(l.start_time);
    const endTime = formatTime(l.end_time);
    const createdAt = formatDistanceToNow(l.created_at);

    const hasError = l?.request_event_logs?.find(e => e?.error)?.error;

    return {
      ...l,
      startTime,
      endTime,
      createdAt,
      hasError,
    };
  }), [logs]);

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
      title: 'Events',
      dataIndex: ['request_event_logs_aggregate', 'aggregate', 'count'],
      key: 'events_count',
    },
    {
      title: 'Creator',
      dataIndex: ['user', 'display_name'],
      key: 'display_name',
    },
    {
      title: 'Duration (ms)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Start time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
          rowClassName={(record) => cx(s.row, record?.hasError && s.rowWithError)}
          onRow={record => ({ onClick: () => onClickRow(record.id) })}
        />
      </Col>
    </Row>,
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
