import React, { useEffect } from 'react';

import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import useAuthToken from 'hooks/useAuthToken';

const Logout = () => {
  const { doLogout } = useAuthToken();

  useEffect(() => {
    doLogout();
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
