import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import usePreAggregations from 'hooks/usePreAggregations';

import TableList from 'components/TableList';
import EmptyDefault from 'components/EmptyDefault';

const PreAggregationPreview = ({ datasourceId, preAggregation }) => {
  const tableName = useMemo(() => {
    const schemaName = preAggregation?.preAggregation?.preAggregationsSchema;
    const table = preAggregation?.id?.toLowerCase().replace('.', '_');

    return `${schemaName}.${table}`;
  }, [preAggregation]);

  const {
    previews,
    queries: {
      preAggregationPreviewData,
    },
  } = usePreAggregations({
    params: {
      datasourceId,
      preAggregationId: preAggregation?.id,
      tableName,
    },
  });

  const columns = useMemo(() => Object.keys(previews?.[0] || {}).map(key => ({
    title: key,
    dataIndex: key,
    key,
  })), [previews]);

  if (!previews && !preAggregationPreviewData.fetching) {
    return <EmptyDefault description="No data. Please check Cube.js logs." />;
  }

  return (
    <Row type="flex" justify="space-around" align="top" gutter={24} key="1">
      <Col span={24}>
        <TableList
          loading={preAggregationPreviewData.fetching}
          rowKey={row => row.id}
          columns={columns}
          dataSource={previews}
        />
      </Col>
    </Row>
  );
};

PreAggregationPreview.propTypes = {
  datasourceId: PropTypes.string,
  preAggregation: PropTypes.object,
};

PreAggregationPreview.defaultProps = {
  datasourceId: null,
  preAggregation: {},
};

export default PreAggregationPreview;
