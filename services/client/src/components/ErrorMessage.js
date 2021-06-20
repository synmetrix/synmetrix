import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Icon } from 'antd';

const ErrorMessage = ({ style, type, text, icon }) => {
  let message = text;

  if (typeof text === 'string') {
    message = (text || '').trim();
  }

  if (!message) {
    return null;
  }

  let iconProps = {};

  if (icon) {
    iconProps = {
      showIcon: true,
      icon: <Icon type={icon} />
    };
  }

  return (
    <Alert 
      style={{ marginBottom: 20, whiteSpace: 'pre-wrap', ...style }}
      icon={<Icon type={icon} />}
      message={message}
      type={type}
      {...iconProps}
    />
  );
};

ErrorMessage.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
  text: PropTypes.any,
  icon: PropTypes.string,
};

ErrorMessage.defaultProps = {
  style: {},
  type: 'error',
  text: '',
  icon: null,
};

export default ErrorMessage;
