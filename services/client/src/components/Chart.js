import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { get, getOr } from 'unchanged';
import cx from 'classnames';

import { VegaLite } from 'react-vega';
import Loader from 'components/Loader';
import TableView from 'components/TableView';

import s from './Chart.module.css';

const getSize = (size, diff) => {
  const resid = size - diff;
  const result = resid >= 0 ? resid : 0;

  return result;
};

const Chart = ({ id, current, loading, size }) => {
  const data = {
    values: getOr([], 'explorationByExplorationId.dataCube.data', current)
  };

  const type = get('spec.type', current);

  const item = useMemo(() => {
    let width = 0;
    let height = 0;

    if (type === 'chart') {
      width = getSize(size.width, 100);

      const vconcat = current.spec.vconcat.map(vc => {
        vc.width = width;
        return vc;
      });

      const spec = {
        ...current.spec,
        vconcat,
        data,
      };

      return (
        <div id={id}>
          <VegaLite
            spec={spec}
            actions={false}
            width={width}
          />
        </div>
      );
    }
    if (type === 'raw-table') {
      width = getSize(size.width, 10);
      height = getSize(size.height, 45);

      return (
        <TableView
          tableId={id}
          width={width}
          height={height}
          data={data.values}
          columns={current.spec.columns}
          colWidth={(size.width - 10) / current.spec.columns.length}
        />
      );
    }
    return null;
  }, [current.spec, data, id, size.height, size.width, type]);

  return (
    <>
      {loading && (
        <div className={cx(s.content, loading && s.loading)}>
          <Loader spinning={loading} />
        </div>
      )}
      {!loading && (
        <div className={cx(s.content)}>
          {item}
        </div>
      )}
    </>
  );
};

Chart.propTypes = {
  id: PropTypes.string,
  current: PropTypes.object,
  size: PropTypes.object,
  loading: PropTypes.bool,
};

Chart.defaultProps = {
  id: null,
  current: {},
  size: {},
  loading: false,
};

export default Chart;
