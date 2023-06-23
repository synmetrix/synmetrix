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
  query ($datasource_id: String!, $pre_aggregation_id: String!) {
    pre_aggregation_preview(pre_aggregation_id: $pre_aggregation_id, datasource_id: $datasource_id){
      data
    }
  }
`;

const role = 'user';
export default ({ datasourceId = null, preAggregationId = null, }) => {
  const [preAggregationsData, execQueryPreAggregations] = useQuery({
    query: preAggregationsQuery,
    variables: { datasource_id: datasourceId },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });
    
  const [preAggregationPreviewData, execQueryPreAggregationPreview] = useQuery({
    query: preAggregationPreviewQuery,
    variables: {
      datasource_id: datasourceId,
      pre_aggregation_id: preAggregationId,
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
    if (preAggregationId) {
      execQueryPreAggregationPreview();
    }
  }, [preAggregationId, execQueryPreAggregationPreview]);

  const preAggregations = useMemo(() => preAggregationsData?.data?.pre_aggregations?.data || [], [preAggregationsData]);
  const preview = useMemo(() => preAggregationPreviewData?.data?.pre_aggregation_preview?.data || {}, [preAggregationPreviewData]);

  return {
    preAggregations,
    preview,
    queries: {
      preAggregationsData,
      execQueryPreAggregations,
      preAggregationPreviewData,
      execQueryPreAggregationPreview,
    },
  };
};
