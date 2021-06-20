import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, Button, Icon } from 'antd';

const TooltipIcon = ({ text, iconType, style, mode, shape }) => {
  if (mode === 'inline') {
    return (
      <Tooltip placement="topLeft" title={text} arrowPointAtCenter>
        <Icon style={style} type={iconType} />
      </Tooltip>
    );
  }

  return (
    <Tooltip placement="topLeft" title={text} arrowPointAtCenter>
      <Button style={{ border: 'transparent', boxShadow: 'none', ...style }} size="small" shape={shape}>
        <Icon type={iconType} />
      </Button>
    </Tooltip>
  );
};

TooltipIcon.propTypes = {
  mode: PropTypes.string,
  iconType: PropTypes.string,
  shape: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  style: PropTypes.object,
};

TooltipIcon.defaultProps = {
  shape: 'circle',
  mode: 'button',
  iconType: 'question-circle',
  style: {},
};

export default TooltipIcon;
