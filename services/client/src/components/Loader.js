import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

const Loader = ({ spinning, tip, children, style }) => (
  <Spin
    spinning={spinning}
    tip={tip}
    style={style}
  >
    {children}
  </Spin>
);

Loader.propTypes = {
  spinning: PropTypes.bool,
  tip: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  style: PropTypes.object
};

Loader.defaultProps = {
  spinning: false,
  tip: undefined,
  style: {}
};

export default Loader;
