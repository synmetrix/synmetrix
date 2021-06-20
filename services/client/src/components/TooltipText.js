import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'antd';

import s from './TooltipText.module.css';

const TooltipText = ({ text, style, children }) => (
  <Tooltip placement="topLeft" title={text} arrowPointAtCenter>
    <span className={s.root} style={style}>
      {children}
    </span>
  </Tooltip>
);

TooltipText.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  style: PropTypes.object,
};

TooltipText.defaultProps = {
  style: {},
};

export default TooltipText;
