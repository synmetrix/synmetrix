import { useCallback } from 'react';

import {
  useRecoilState,
} from 'recoil';

import { currentToken, currentRefreshToken } from '../recoil/currentUser';
import useLocation from './useLocation';
import useAuth from './useAuth';
import useAppSettings from './useAppSettings';
import useCurrentTeamState from './useCurrentTeamState';

export default () => {
  const [authToken, setAuthToken] = useRecoilState(currentToken);
  const [refreshToken, setRefreshToken] = useRecoilState(currentRefreshToken);
  const { withAuthPrefix } = useAppSettings();
  const { setCurrentTeamState } = useCurrentTeamState();

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

  const doLogout = useCallback(async () => {
    await logout.run();
    cleanTokens();
    setCurrentTeamState(null);
  }, [cleanTokens, logout, setCurrentTeamState]);

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
