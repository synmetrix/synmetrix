import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getOr } from 'unchanged';

import ErrorFound from 'components/ErrorFound';
import Breadcrumbs from 'components/Breadcrumbs';
import Chart from 'components/Chart';
import { rowHeight } from 'pages/Dashboards';

import useAppSettings from 'hooks/useAppSettings';
import usePinnedItems from 'hooks/usePinnedItems';
import useDimensions from 'hooks/useDimensions';
import useExplorations from 'hooks/useExplorations';

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
    queries: {
      currentData: explorationData,
    },
  } = useExplorations({
    params: {
      editId: current?.exploration?.id,
    },
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

  if (!rowId) {
    return <ErrorFound status={400} />;
  };

  return (
    <>
      <div style={{ margin: '15px 20px' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div style={{ minHeight: height }} ref={ref}>
        <Chart
          spec={current?.spec}
          values={explorationData?.data?.fetch_dataset?.data}
          loading={loadingPinnedItem || explorationData.fetching}
          size={size}
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
