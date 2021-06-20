import React from 'react';
import PropTypes from 'prop-types';

const ComponentSwitcher = ({ items, activeItemIndex }) => {
  if (typeof activeItemIndex === 'string' && activeItemIndex === 'all') {
    return <>{items}</>;
  }

  return items[activeItemIndex || 0];
};

ComponentSwitcher.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ])
  ).isRequired,
  activeItemIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
};

ComponentSwitcher.defaultProps = {
  activeItemIndex: 0,
};

export default ComponentSwitcher;
