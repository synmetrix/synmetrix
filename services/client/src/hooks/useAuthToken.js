import { useCallback } from 'react';

import {
  useRecoilState,
} from 'recoil';

import { currentToken, currentRefreshToken } from '../recoil/currentUser';
import useLocation from './useLocation';
import useAuth from './useAuth';
import useAppSettings from './useAppSettings';

export default () => {
  const [authToken, setAuthToken] = useRecoilState(currentToken);
  const [refreshToken, setRefreshToken] = useRecoilState(currentRefreshToken);
  const { withAuthPrefix } = useAppSettings();

  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  const doAuth = (jwtTokenValue, refreshTokenValue) => {
    setAuthToken(jwtTokenValue);
    setRefreshToken(refreshTokenValue);
    setLocation(withAuthPrefix('/sources'));
  };

  const cleanTokens = useCallback(() => {
    setAuthToken(null);
    setRefreshToken(null);
  }, [setAuthToken, setRefreshToken]);

  const doLogout = useCallback(() => {
    logout.run();
    cleanTokens();
  }, [cleanTokens, logout]);

  return {
    authToken,
    setAuthToken,
    refreshToken,
    setRefreshToken,
    doAuth,
    doLogout,
    cleanTokens,
  };
};
