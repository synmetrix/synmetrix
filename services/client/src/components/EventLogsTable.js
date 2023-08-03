import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TableList from 'components/TableList';
import formatTime from 'utils/formatTime';

const EventLogsTable = ({ events }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('Event'),
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: t('Duration (ms)'),
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: t('Time in queue (ms)'),
      dataIndex: 'time_in_queue',
      key: 'time_in_queue',
      render: value => value || 0,
    },
    {
      title: t('Timestamp'),
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
