import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, style = {} }) => (
  <div style={{ 
    width: '100%',
    maxWidth: 1300,
    minHeight: 'auto',
    margin: '0 auto',
    background: '#fff',
    ...style,
  }}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  style: PropTypes.object,
};

Container.defaultProps = {
  style: {},
};

export default Container;
