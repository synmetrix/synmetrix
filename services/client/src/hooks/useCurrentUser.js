import { useCallback, useMemo, useEffect } from 'react';

import {
  useRecoilValue,
  useRecoilState,
} from 'recoil';

import { useQuery } from 'urql';

import {
  jwtPayload,
  currentUserAtom,
} from '../recoil/currentUser';

import useAuthToken from './useAuthToken';

const currentUserQuery = `
  query ($id: uuid!) {
    users_by_pk (id: $id) {
      id
      display_name
    }

    datasources (order_by: { created_at: desc }) {
      id
      name
    }
  }
`;

const role = 'user';
export default () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const { authToken } = useAuthToken();

  const JWTpayload = useRecoilValue(jwtPayload);
  const userId = JWTpayload?.['x-hasura-user-id'];

  const [currentUserData, doQueryCurrentUser] = useQuery({
    query: currentUserQuery,
    pause: true,
    variables: {
      id: userId,
    },
  });

  useEffect(() => {
    const userData = currentUserData?.data;

    if (userData) {
      setCurrentUser(userData);
    } else {
      setCurrentUser(null);
    }
  }, [currentUserData.data, setCurrentUser]);

  const execQueryCurrentUser = useCallback((context) => {
    doQueryCurrentUser({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryCurrentUser]);

  useEffect(() => {
    if (authToken) {
      execQueryCurrentUser();
    }
  }, [authToken, execQueryCurrentUser]);

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
