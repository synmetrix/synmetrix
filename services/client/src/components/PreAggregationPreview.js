import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Row, Col, Empty } from 'antd';

import usePreAggregations from 'hooks/usePreAggregations';

import TableList from 'components/TableList';

const PreAggregationPreview = ({ datasourceId, preAggregation }) => {
  const { t } = useTranslation();

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
    datasourceId,
    preAggregationId: preAggregation?.id,
    tableName,
  });

  const columns = useMemo(() => Object.keys(previews?.[0] || {}).map(key => ({
    title: key,
    dataIndex: key,
    key,
  })), [previews]);

  if (!previews && !preAggregationPreviewData.fetching) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('No data. Please check Cube.js logs.')} />;
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
