import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

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

const Chart = ({ id, spec, loading, size, values }) => {
  const data = {
    values,
  };

  const item = useMemo(() => {
    let width = 0;
    let height = 0;

    if (spec?.type === 'chart') {
      width = getSize(size.width, 100);

      const vconcat = spec?.vconcat.map(vc => {
        vc.width = width;
        return vc;
      });

      const chartSpec = {
        ...(spec || {}),
        vconcat,
        data,
      };

      return (
        <div id={id}>
          <VegaLite
            spec={chartSpec}
            actions={false}
            width={width}
          />
        </div>
      );
    }

    if (spec?.type === 'raw-table' && spec?.columns?.length) {
      width = getSize(size.width, 10);
      height = getSize(size.height, 45);

      return (
        <TableView
          tableId={id}
          width={width}
          height={height}
          data={data.values}
          columns={spec?.columns}
          colWidth={(size.width - 10) / spec?.columns?.length}
        />
      );
    }
    return null;
  }, [data, id, size.height, size.width, spec]);

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
  size: PropTypes.object,
  spec: PropTypes.object,
  values: PropTypes.array,
  loading: PropTypes.bool,
};

Chart.defaultProps = {
  id: null,
  size: {},
  spec: {},
  values: [],
  loading: false,
};

export default Chart;
