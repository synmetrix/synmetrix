import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import TableList from 'components/TableList';

const PreAggregationsTable = ({ datasource, loading, onClickRow }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last started at',
      dataIndex: 'last_time',
      key: 'last_time',
    },
    {
      title: 'Partitions',
      dataIndex: 'partitions',
      key: 'partitions',
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
          onRow={record => ({ onClick: () => onClickRow(record.id) })}
        />
      </Col>
    </Row>,
  ];
};

PreAggregationsTable.propTypes = {
  datasource: PropTypes.array,
  loading: PropTypes.bool,
  onClickRow: PropTypes.func,
};

PreAggregationsTable.defaultProps = {
  datasource: [],
  loading: false,
  onClickRow: () => {},
};

export default PreAggregationsTable;
