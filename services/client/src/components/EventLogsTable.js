import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TableList from 'components/TableList';

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
      render: (_, __, i) => {
        const sortedEvents = events?.sort((a, b) => a.timestamp > b.timestamp);
        const curTimestamp = sortedEvents?.[i]?.timestamp;
        const firstTimestamp = sortedEvents?.[i - 1]?.timestamp || curTimestamp;

        return new Date(curTimestamp) - new Date(firstTimestamp);
      }
    },
    {
      title: 'Time in queue (ms)',
      dataIndex: 'time_in_queue',
      key: 'time_in_queue',
      render: (value) => (value || 0),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (value) => moment(value).format('DD.MM.YY, hh:mm:ss.SSS'),
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
