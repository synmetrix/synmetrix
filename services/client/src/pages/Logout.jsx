import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocation from 'wouter/use-location';

import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { removeAuthToken } from '../utils/cookies';

const Logout = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    removeAuthToken();
    setLocation('/');
  })

  return (
    <Result
      icon={<SmileOutlined />}
      title="Have a great day!"
    />
  );
};

Logout.propTypes = {};

Logout.defaultProps = {};

export default Logout;
