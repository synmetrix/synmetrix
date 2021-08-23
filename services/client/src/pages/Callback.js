import React from 'react';
import queryString from 'query-string';
import { useSetRecoilState } from 'recoil';

import { Redirect } from 'wouter';
import { currentToken } from '../recoil/currentUser';

const Callback = () => {
  const setToken = useSetRecoilState(currentToken);
  const { token } = queryString.parse(window.location.search);

  setToken(token);

  return <Redirect to="/d/sources" />;
};

export default Callback;
