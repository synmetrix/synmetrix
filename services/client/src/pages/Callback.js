import React from 'react';
import queryString from 'query-string';

import { Redirect } from 'wouter';
import { saveAuthToken } from '../utils/cookies';

const Callback = () => {
  const { token } = queryString.parse(window.location.search);

  saveAuthToken(token);

  return <Redirect to="/d/sources" />;
};

export default Callback;
