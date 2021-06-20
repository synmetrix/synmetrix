import React from 'react';
import PropTypes from 'prop-types';

import { Empty } from 'antd';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import Loader from 'components/Loader';

const ChartView = (props) => {
  const {
    data,
    emptyDesc,
    loading,
    width,
    height,
    title,
    disableAnimation
  } = props;

  if (!data || !data.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDesc} />;
  }

  return (
    <Loader spinning={loading}>
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      <LineChart width={width} height={height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis domain={['auto', 'auto']} />
        <Line type="monotone" dataKey="y" dot={false} animationDuration={disableAnimation ? 0 : 1500} />
        <Tooltip />
      </LineChart>
    </Loader>
  );
};

ChartView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.bool,
  title: PropTypes.any,
  emptyDesc: PropTypes.string,
  disableAnimation: PropTypes.bool,
};

ChartView.defaultProps = {
  data: [],
  width: 300,
  height: 300,
  loading: false,
  title: 'Chart',
  emptyDesc: 'Can\'t render without data',
  disableAnimation: false,
};

export default ChartView;
