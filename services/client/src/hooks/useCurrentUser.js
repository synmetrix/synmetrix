import { useEffect } from 'react';

import {
  useRecoilValue,
  useRecoilState,
} from 'recoil';

import { useDebounceFn, useUpdateEffect } from 'ahooks';

import { useQuery } from 'urql';

import {
  jwtPayload,
  currentUserAtom,
} from '../recoil/currentUser';

import useAuthToken from './useAuthToken';
import useSources from './useSources';
import useDashboards from './useDashboards';

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

    dataschemas (order_by: { created_at: desc }) {
      id
      name
    }

    dashboards (order_by: { created_at: desc }) {
      id
      name
    }
  }
`;

const role = 'user';
export default (props = {}) => {
  const { pauseQuery = false } = props;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const { authToken } = useAuthToken();

  const JWTpayload = useRecoilValue(jwtPayload);
  const userId = JWTpayload?.['x-hasura-user-id'];

  const [currentUserData, doQueryCurrentUser] = useQuery({
    query: currentUserQuery,
    pause: pauseQuery,
    variables: {
      id: userId,
    },
  });

  useEffect(() => {
    const userData = currentUserData?.data;

    if (userData) {
      setCurrentUser(userData);
    } else {
      setCurrentUser({});
    }
  }, [currentUserData.data, setCurrentUser]);

  const { run: execQueryCurrentUser } = useDebounceFn((context) => {
    doQueryCurrentUser({ requestPolicy: 'cache-and-network', role, ...context });
  }, {
    wait: 500,
  });

  useUpdateEffect(() => {
    if (authToken) {
      execQueryCurrentUser();
    }
  }, [authToken, execQueryCurrentUser]);

  const { subscription: sourcesSubscription } = useSources({
    pauseQueryAll: true,
    disableSubscription: false,
  });

  const { subscription: dashboardsSubscription } = useDashboards({
    pauseQueryAll: true,
    disableSubscription: false,
  });

  useUpdateEffect(() => {
    const anyData = sourcesSubscription.data || dashboardsSubscription.data;

    if (anyData) {
      sourcesSubscription.data = null;
      dashboardsSubscription.data = null;
      execQueryCurrentUser();
    }
  }, [sourcesSubscription.data, dashboardsSubscription.data]);

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
