import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { get, getOr } from 'unchanged';

import ErrorFound from 'components/ErrorFound';
import Breadcrumbs from 'components/Breadcrumbs';
import Chart from 'components/Chart';
import { rowHeight } from 'pages/Dashboards';

import usePinnedItems from 'hooks/usePinnedItems';

const Charts = ({ params }) => {
  const { rowId } = params;

  const {
    current,
    queries: {
      currentData: {
        fetching: loadingPinnedItem
      }
    }
  } = usePinnedItems({ rowId });

  const [height, setHeight] = useState(400);
  const dashboard = get('dashboardByDashboardId', current);
  useEffect(() => {
    if (dashboard) {
      const layoutItem = (dashboard.layout || []).find(l => l.i === rowId);
      const itemHeight = getOr(10, 'h', layoutItem);
      setHeight(itemHeight * rowHeight + 90);
    }
  }, [current, dashboard, rowId]);

  let breadcrumbs = [];
  if (current.name && dashboard) {
    breadcrumbs = [
      { path: `/d/dashboards/${dashboard.rowId}`, title: dashboard.name },
      { path: `/d/charts/${rowId}`, title: current.name },
    ].filter(v => !!v);
  };

  if (!rowId) {
    return <ErrorFound status={400} />;
  };

  return (
    <>
      <div style={{ margin: '15px 20px' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div style={{ height }}>
        <Chart id='chart' current={current} loading={loadingPinnedItem} />
      </div>
    </>
  );
};

Charts.propTypes = {
  params: PropTypes.shape({
    rowId: PropTypes.string,
  }).isRequired,
};

Charts.defaultProps = {
};

export default Charts;
