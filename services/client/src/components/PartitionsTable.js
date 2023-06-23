import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import TableList from 'components/TableList';
import formatDistanceToNow from '../utils/formatDistanceToNow';

const PartitionsTable = ({ partitions }) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'preAggregationId',
      key: 'preAggregationId',
    },
    {
      title: 'Last started',
      dataIndex: 'last_time',
      key: 'last_time',
      render: (_, record) => formatDistanceToNow(record?.versionEntries?.[0]?.last_updated_at),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Partition size',
      dataIndex: 'partition_size',
      key: 'partition_size',
    },
  ];

  return [
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={false}
          rowKey={row => row.id}
          columns={columns}
          dataSource={partitions}
          // onRow={record => ({ onClick: () => onClickRow(record.id) })}
        />
      </Col>
    </Row>,
  ];
};

PartitionsTable.propTypes = {
  partitions: PropTypes.array,
  loading: PropTypes.bool,
  onClickRow: PropTypes.func,
};

PartitionsTable.defaultProps = {
  partitions: [],
  loading: false,
  onClickRow: () => {},
};

export default PartitionsTable;
