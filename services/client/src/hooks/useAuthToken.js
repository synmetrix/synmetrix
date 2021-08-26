import { useCallback } from 'react';

import {
  useRecoilState,
} from 'recoil';

import { currentToken } from '../recoil/currentUser';
import useLocation from './useLocation';

export default () => {
  const [authToken, setAuthToken] = useRecoilState(currentToken);
  const [, setLocation] = useLocation();

  const doAuth = jwtToken => {
    setAuthToken(jwtToken);
    setLocation('/d/sources');
  };

  const doLogout = useCallback(() => {
    setAuthToken(null);
    setLocation('/login');
  }, [
    setAuthToken,
    setLocation,
  ]);

  return {
    authToken,
    setAuthToken,
    doAuth,
    doLogout,
  };
};
