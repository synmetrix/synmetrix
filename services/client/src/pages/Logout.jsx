import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocation from 'wouter/use-location';
import { useSetRecoilState } from 'recoil';

import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { currentToken } from '../recoil/currentUser';

const Logout = () => {
  const setToken = useSetRecoilState(currentToken);

  const [, setLocation] = useLocation();

  useEffect(() => {
    setToken(null);
    setLocation('/');
  });

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
