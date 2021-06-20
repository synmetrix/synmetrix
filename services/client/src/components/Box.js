import React from 'react';
import PropTypes from 'prop-types';

const Box = ({ width, height, style, stopPropagation, children }) => (
  <div style={{ width, height, ...style }} onClick={e => stopPropagation && e.stopPropagation()}>
    {children}
  </div>
);

Box.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  stopPropagation: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Box.defaultProps = {
  width: 'auto',
  height: 'auto',
  style: {},
  stopPropagation: false,
};

export default Box;
