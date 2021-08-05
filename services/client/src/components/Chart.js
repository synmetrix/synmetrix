import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { get, getOr } from 'unchanged';
import cx from 'classnames';

import { VegaLite } from 'react-vega';
import ReactResizeDetector from 'react-resize-detector';
import Loader from 'components/Loader';
import TableView from 'components/TableView';

import useXState from 'hooks/useXState';

import s from './Chart.module.css';

const getSize = (size, diff) => {
  const resid = size - diff;
  const result = resid >= 0 ? resid : 0;

  return result;
};

const Chart = ({ id, current, loading }) => {
  const [state, updateState] = useXState({
    width: 0,
    height: 0,
  });

  const data = {
    values: getOr([], 'explorationByExplorationId.dataCube.data', current)
  };

  const type = get('spec.type', current);
  const item = useMemo(() => {
    let width = 0;
    let height = 0;

    if (type === 'chart') {
      width = getSize(state.width, 100);
      height = getSize(state.height, 105);

      return (
        <div id={id}>
          <VegaLite
            spec={{
              ...current.spec,
              data,
            }}
            actions={false}
            width={width}
            height={height}
          />
        </div>
      );
    }
    if (type === 'raw-table') {
      width = getSize(state.width, 10);
      height = getSize(state.height, 45);

      return (
        <TableView
          tableId={id}
          width={width}
          height={height}
          data={data.values}
          columns={current.spec.columns}
          colWidth={(state.width - 10) / current.spec.columns.length}
        />
      );
    }
    return null;
  }, [current.spec, data, id, state.height, state.width, type]);

  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
      onResize={(width, height) => updateState({ width, height })}
    >
      <div className={cx(s.content, loading && s.loading)}>
        <Loader spinning={loading}>
          {item}
        </Loader>
      </div>
    </ReactResizeDetector>
  );
};

Chart.propTypes = {
  id: PropTypes.string,
  current: PropTypes.object,
  loading: PropTypes.bool,
};

Chart.defaultProps = {
  id: null,
  current: {},
  loading: false,
};

export default Chart;
