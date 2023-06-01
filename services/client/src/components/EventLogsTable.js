import React from 'react';
import PropTypes from 'prop-types';

import TableList from 'components/TableList';
import formatTime from 'utils/formatTime';

const EventLogsTable = ({ events }) => {
  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'Duration (ms)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Time in queue (ms)',
      dataIndex: 'time_in_queue',
      key: 'time_in_queue',
      render: value => value || 0,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: value => formatTime(value),
    },
  ];

  return (
    <TableList
      rowKey={row => row.id}
      columns={columns}
      dataSource={events}
      expandRowByClick
      scroll={{ x: true }}
      pagination={false}
    />
  );
};

EventLogsTable.propTypes = {
  events: PropTypes.array,
};

EventLogsTable.defaultProps = {
  events: [],
};

export default EventLogsTable;
