import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import usePreAggregations from 'hooks/usePreAggregations';

import TableList from 'components/TableList';

const PreAggregationPreview = ({ datasourceId, preAggregationId }) => {
  const {
    preview,
    queries: {
      preAggregationPreviewData,
    },
  } = usePreAggregations({
    datasourceId,
    preAggregationId,
  });

  const columns = useMemo(() => Object.keys(preview?.previews?.[0] || {}).map(key => ({
    title: key,
    dataIndex: key,
    key,
  })), [preview]);

  return [
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={preAggregationPreviewData?.fetching}
          rowKey={row => row.id}
          columns={columns}
          dataSource={preview?.previews}
        />
      </Col>
    </Row>,
  ];
};

PreAggregationPreview.propTypes = {
  datasourceId: PropTypes.string,
  preAggregationId: PropTypes.string,
};

PreAggregationPreview.defaultProps = {
  datasourceId: null,
  preAggregationId: null,
};

export default PreAggregationPreview;
