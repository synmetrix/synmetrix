import { useEffect, useMemo } from 'react';

import useQuery from './useQuery';

const preAggregationsQuery = `
  query ($datasource_id: String!) {
    pre_aggregations(datasource_id: $datasource_id){
      data
    }
  }
`;

const preAggregationPreviewQuery = `
  query ($datasource_id: String!, $pre_aggregation_id: String!, $table_name: String!) {
    pre_aggregation_preview(pre_aggregation_id: $pre_aggregation_id, datasource_id: $datasource_id, table_name: $table_name){
      data
    }
  }
`;

const role = 'user';
export default ({ params }) => {
  const { datasourceId, preAggregationId, tableName } = params;

  const [preAggregationsData, execQueryPreAggregations] = useQuery({
    query: preAggregationsQuery,
    variables: { datasource_id: datasourceId },
    pause: false,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [preAggregationPreviewData, execQueryPreAggregationPreview] = useQuery({
    query: preAggregationPreviewQuery,
    variables: {
      datasource_id: datasourceId,
      pre_aggregation_id: preAggregationId,
      table_name: tableName,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  useEffect(() => {
    if (datasourceId) {
      execQueryPreAggregations();
    }
  }, [datasourceId, execQueryPreAggregations]);

  useEffect(() => {
    if (datasourceId && preAggregationId) {
      execQueryPreAggregationPreview();
    }
  }, [datasourceId, preAggregationId, execQueryPreAggregationPreview]);

  const allPreAggregations = useMemo(() => preAggregationsData?.data?.pre_aggregations?.data || [], [preAggregationsData]);
  const previews = useMemo(() => preAggregationPreviewData?.data?.pre_aggregation_preview?.data?.previews, [preAggregationPreviewData]);

  return {
    allPreAggregations,
    previews,
    queries: {
      preAggregationsData,
      execQueryPreAggregations,
      preAggregationPreviewData,
      execQueryPreAggregationPreview,
    },
  };
};
