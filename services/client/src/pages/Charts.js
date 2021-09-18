import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getOr } from 'unchanged';

import ErrorFound from 'components/ErrorFound';
import Breadcrumbs from 'components/Breadcrumbs';
import Chart from 'components/Chart';
import { cellRenderer } from 'components/TableView';
import { rowHeight } from 'pages/Dashboards';

import useQuery from 'hooks/useQuery';
import useAppSettings from 'hooks/useAppSettings';
import usePinnedItems from 'hooks/usePinnedItems';
import useDimensions from 'hooks/useDimensions';
import useExplorations from 'hooks/useExplorations';
import useAnalyticsQueryMembers from 'hooks/useAnalyticsQueryMembers';
import useDataSourceMeta from 'hooks/useDataSourceMeta';
import { datasourceMetaQuery } from 'hooks/useSources';

const Charts = ({ match }) => {
  const { withAuthPrefix } = useAppSettings();
  const { params } = match || {};
  const { rowId } = params;
  const [ref, size] = useDimensions();

  const {
    current,
    queries: {
      currentData: {
        fetching: loadingPinnedItem
      }
    }
  } = usePinnedItems({
    params: {
      editId: rowId,
    },
  });

  const {
    current: exploration,
    queries: {
      currentData: explorationData,
    },
  } = useExplorations({
    params: {
      editId: current?.exploration_id,
    },
  });

  const datasourceId = exploration?.datasource_id;

  const [metaData] = useQuery({
    query: datasourceMetaQuery,
    pause: false,
    variables: {
      datasource_id: datasourceId,
    },
  }, {
    requestPolicy: 'cache-first',
    role: 'user',
  });

  const meta = metaData?.data?.fetch_meta?.cubes || [];

  const {
    selectedQueryMembers,
  } = useDataSourceMeta({ meta, playgroundState: exploration?.playground_state || {} });

  const { baseMembers: { index: membersIndex } } = useAnalyticsQueryMembers({ 
    selectedQueryMembers,
    settings: exploration?.playground_settings,
  });

  const [height, setHeight] = useState(400);
  const { dashboard } = current || {};

  useEffect(() => {
    if (dashboard) {
      const layoutItem = (dashboard.layout || []).find(l => l.i === rowId);
      const itemHeight = getOr(10, 'h', layoutItem);
      setHeight(itemHeight * rowHeight + 90);
    }
  }, [current, dashboard, rowId]);

  let breadcrumbs = [];
  if (current?.name && dashboard) {
    breadcrumbs = [
      { path: withAuthPrefix(`/dashboards/${dashboard.id}`), title: dashboard.name },
      { path: withAuthPrefix(`/charts/${rowId}`), title: current.name },
    ].filter(v => !!v);
  };

  if (current === null || !rowId) {
    return <ErrorFound status={404} />;
  };

  const loading = loadingPinnedItem || explorationData.fetching || metaData.fetching;

  return (
    <>
      <div style={{ margin: '15px 20px' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div style={{ minHeight: height }} ref={ref}>
        <Chart
          spec={current?.spec}
          values={explorationData?.data?.fetch_dataset?.data}
          loading={loading}
          size={size}
          defaultTableCellRenderer={(args) => cellRenderer(args, membersIndex)}
        />
      </div>
    </>
  );
};

Charts.propTypes = {
  match: PropTypes.object.isRequired,
};

Charts.defaultProps = {};

export default Charts;
