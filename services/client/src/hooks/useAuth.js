import { useMemo, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from 'urql';
import { get, getOr } from 'unchanged';

import { useRouter } from 'wouter';
import useLocation from 'wouter/use-location';
import trackEvent from 'utils/trackEvent';
import useGlobalStore from './useGlobalStore';
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
      dashboardsByUserId {
        totalCount
      }
      teamByTeamId {
        memberIds
        members {
          dashboardsByUserId {
            totalCount
          }
        }
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

const updatePasswordMutation = `
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
  const router = useRouter();
  const { setAuthToken } = useAuthToken();
  const [, navigate] = useLocation();

  const { checkMe } = options;
  const [signUpMutationData, executeSignUpMutation] = useMutation(SignUpMutation);
  const [loginMutationData, executeLoginMutation] = useMutation(LoginMutation);

  const mExecuteLoginMutation = useCallback(({ input }) => {
    trackEvent('Login');

    executeLoginMutation({ input });
  }, [executeLoginMutation]);

  const [currentUserData, execCurrentUserQuery] = useQuery({
    query: CurrentUserQuery,
    pause: true,
  });

  const { saveCachedRestrictScopes } = usePermissions({});

  const { setLastUsedDataSourceId } = useGlobalStore();
  const logout = useCallback(() => {
    setLastUsedDataSourceId('');
    setAuthToken(null);
    navigate('/login');
    saveCachedRestrictScopes([]);
  }, [
    setAuthToken,
    setLastUsedDataSourceId,
    navigate,
    saveCachedRestrictScopes
  ]);

  const mExecCurrentUserQuery = useCallback(() => {
    execCurrentUserQuery({ requestPolicy: 'network-only' });
  }, [execCurrentUserQuery]);

  const [revokeMutation, execRevokeJWTMutation] = useMutation(revokeJWTMutation);
  const mExecRevokeJWTMutation = useCallback(() => {
    trackEvent('Revoke JWT');

    execRevokeJWTMutation();
    logout();
  }, [execRevokeJWTMutation, logout]);

  const [updatePasswordData, execUpdatePasswordMutation] = useMutation(updatePasswordMutation);
  const mExecUpdatePasswordMutation = useCallback((input) => {
    trackEvent('Update Password');

    execUpdatePasswordMutation({ input });
  }, [execUpdatePasswordMutation]);

  const currentUser = useMemo(() => get('currentUser', currentUserData.data) || {}, [currentUserData.data]);

  const dashboardsCount = useMemo(() => {
    const userDashboards = get('dashboardsByUserId.totalCount', currentUser);

    if (userDashboards) {
      return userDashboards;
    }

    const members = getOr([], 'teamByTeamId.members', currentUser);

    const count = members.reduce((acc, cur) => {
      const curCount = getOr(0, 'dashboardsByUserId.totalCount', cur);
      return acc + curCount;
    }, 0);

    return count;
  }, [currentUser]);

  const loginData = useMemo(
    () => ({
      errors: getOr([], 'error.graphQLErrors', loginMutationData),
    }),
    [loginMutationData]
  );

  const signUpData = useMemo(
    () => ({
      errors: getOr([], 'error.graphQLErrors', signUpMutationData),
    }),
    [signUpMutationData]
  );

  useEffect(() => {
    const token = get('data.login.token', loginMutationData) || get('data.signup.token', signUpMutationData);

    if (token) {
      const teamRole = get('data.login.teamRole', loginMutationData) || get('data.signup.teamRole', signUpMutationData);
      const restrictScopes = get('data.login.restrictScopes', loginMutationData) || get('data.signup.restrictScopes', signUpMutationData);
      saveCachedRestrictScopes(restrictScopes);

      setAuthToken(token);
      loginMutationData.data = null;
      signUpMutationData.data = null;

      if (router.lastTransition && router.lastTransition.path) {
        navigate(router.lastTransition.path);
      } else {
        navigate(getHomePath(teamRole));
      }
    }
  }, [
    setAuthToken,
    checkMe,
    loginMutationData,
    signUpMutationData,
    navigate,
    router.lastTransition,
    saveCachedRestrictScopes
  ]);

  useEffect(() => {
    if (checkMe) {
      mExecCurrentUserQuery();
    }
  }, [checkMe, mExecCurrentUserQuery]);

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
    logout,
    dashboardsCount,
    currentUser, mExecCurrentUserQuery,
    loginData, mExecuteLoginMutation,
    signUpData, executeSignUpMutation,
    revokeMutation, mExecRevokeJWTMutation,
    updatePasswordData, mExecUpdatePasswordMutation
  };
};
