import React from 'react';
import PropTypes from 'prop-types';

import { Badge } from 'antd';

const CountBadge = ({ count, style, }) => (
  <Badge
    count={count} 
    style={{ 
      backgroundColor: '#c1c7cc',
      padding: '0 13px',
      fontSize: '10px',
      color: '#000',
      boxShadow: 'none',
      fontWeight: 700,
      borderRadius: '100px',
      height: 13,
      minHeight: 13,
      lineHeight: '13px',
      ...style,
    }}
  />
);

CountBadge.propTypes = {
  count: PropTypes.number,
  style: PropTypes.object,
};

CountBadge.defaultProps = {
  count: null,
  style: {},
};

export default CountBadge;
