import { useMemo, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from 'urql';
import { get } from 'unchanged';

import { useLocalStorageState } from 'ahooks';
import { useRouter } from 'wouter';
import useLocation from 'wouter/use-location';
import trackEvent from 'utils/trackEvent';

import usePermissions from './usePermissions';
import useAuthToken from './useAuthToken';

const CurrentUserQuery = `
  query CurrentUserQuery {
    currentUser {
      userId: rowId
      teamId
      teamRole
      name
      email
      role
      ACL {
        key
        restrictScopes
      }
    }

    allDatasources {
      nodes {
        rowId
        name
      }
    }

    allDashboards {
      nodes {
        rowId
        name
      }
    }
  }
`;

const LoginMutation = `
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      token
      teamRole
      restrictScopes
    }
  }
`;

const SignUpMutation = `
  mutation SignUpMutation($input: SignupInput!) {
    signup(input: $input) {
      token
      teamRole
      restrictScopes
    }
  }
`;

const revokeJWTMutation = `
  mutation revokeTokensMutation {
    revokeTokens
  }
`;

const UpdatePasswordMutation = `
  mutation UpdatePasswordMutation($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`;

const HOME_VIEWER_PATH = '/d/profile';
const HOME_BASE_PATH = '/d/sources';

const getHomePath = (teamRole) => {
  if (['viewer', 'client'].includes(teamRole)) {
    return HOME_VIEWER_PATH;
  }

  return HOME_BASE_PATH;
};

export default (options = {}) => {
  const [
    lastUsedDashboardId,
    setLastUsedDashboardId
  ] = useLocalStorageState('last-dashboard');

  const [
    lastUsedDataSourceId,
    setLastUsedDataSourceId
  ] = useLocalStorageState('last-datasource');

  const router = useRouter();
  const { 
    setAuthToken,
    userState,
    setUserState,
  } = useAuthToken();

  const [, navigate] = useLocation();

  const { checkMe = false } = options;
  const [signUpMutation, doSignUpMutation] = useMutation(SignUpMutation);
  const [loginMutation, doLoginMutation] = useMutation(LoginMutation);

  const execLoginMutation = useCallback(({ input }) => {
    trackEvent('Login');

    doLoginMutation({ input });
  }, [doLoginMutation]);

  const [currentUserData, doCurrentUserQuery] = useQuery({
    query: CurrentUserQuery,
    pause: true,
  });

  const { saveCachedRestrictScopes } = usePermissions({});

  const logout = useCallback(() => {
    setLastUsedDataSourceId(null);
    setAuthToken(null);
    navigate('/login');
    saveCachedRestrictScopes([]);
  }, [
    setAuthToken,
    setLastUsedDataSourceId,
    navigate,
    saveCachedRestrictScopes
  ]);

  const execCurrentUserQuery = useCallback(() => {
    doCurrentUserQuery({ requestPolicy: 'network-only' });
  }, [doCurrentUserQuery]);

  const [revokeMutation, doRevokeJWTMutation] = useMutation(revokeJWTMutation);
  const execRevokeJWTMutation = useCallback(() => {
    trackEvent('Revoke JWT');

    doRevokeJWTMutation();
    logout();
  }, [doRevokeJWTMutation, logout]);

  const [updatePasswordMutation, doUpdatePassMutation] = useMutation(UpdatePasswordMutation);
  const execUpdatePassMutation = useCallback((input) => {
    trackEvent('Update Password');

    doUpdatePassMutation({ input });
  }, [doUpdatePassMutation]);

  useEffect(() => {
    if (currentUserData.data) {
      setUserState(currentUserData.data);
    }
  }, [currentUserData.data, setUserState]);

  const currentUser = useMemo(() => userState?.currentUser, [userState]);

  useEffect(() => {
    const token = get('data.login.token', loginMutation) || get('data.signup.token', signUpMutation);

    if (token) {
      const teamRole = get('data.login.teamRole', loginMutation) || get('data.signup.teamRole', signUpMutation);
      const restrictScopes = get('data.login.restrictScopes', loginMutation) || get('data.signup.restrictScopes', signUpMutation);
      saveCachedRestrictScopes(restrictScopes);

      setAuthToken(token);
      loginMutation.data = null;
      signUpMutation.data = null;

      if (router.lastTransition && router.lastTransition.path) {
        navigate(router.lastTransition.path);
      } else {
        navigate(getHomePath(teamRole));
      }
    }
  }, [
    setAuthToken,
    checkMe,
    loginMutation,
    signUpMutation,
    navigate,
    router.lastTransition,
    saveCachedRestrictScopes
  ]);

  useEffect(() => {
    if (checkMe && !userState) {
      execCurrentUserQuery();
    }
  }, [checkMe, execCurrentUserQuery, userState]);

  useEffect(() => {
    if (checkMe && currentUserData.data) {
      const userId = get('currentUser.userId', currentUserData.data);

      if (!userId) {
        navigate('/login');
        currentUserData.data = null;
      }
    }
  }, [checkMe, currentUserData.data, navigate]);

  return {
    currentUser,
    logout,
    queries: {
      currentUserData,
      execCurrentUserQuery,
    },
    mutations: {
      loginMutation,
      execLoginMutation,
      signUpMutation,
      execSignUpMutation: doSignUpMutation,
      revokeMutation,
      execRevokeJWTMutation,
      updatePasswordMutation,
      execUpdatePassMutation,
    },
    lastUsedDataSourceId,
    setLastUsedDataSourceId,
    lastUsedDashboardId,
    setLastUsedDashboardId,
  };
};
