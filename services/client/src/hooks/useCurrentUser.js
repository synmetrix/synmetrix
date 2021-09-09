import { useEffect } from 'react';

import {
  useRecoilValue,
  useRecoilState,
} from 'recoil';

import { useDebounceFn, useUpdateEffect, useMount } from 'ahooks';

import { useQuery } from 'urql';

import {
  jwtPayload,
  currentUserSelector,
} from '../recoil/currentUser';

import useAuthToken from './useAuthToken';
import useSources from './useSources';
import useDashboards from './useDashboards';
import useSchemas from './useSchemas';
import useCurrentTeamState from './useCurrentTeamState';

const currentUserQuery = `
  query ($id: uuid!) {
    users_by_pk (id: $id) {
      id
      display_name

      members(order_by: { team: { created_at: desc } }) {
        team {
          id
          name
        }
      }
    }

    datasources (order_by: { created_at: desc }) {
      id
      name
    }

    dataschemas (order_by: { created_at: desc }) {
      id
      name
      checksum
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
  const [currentUser, setCurrentUser] = useRecoilState(currentUserSelector);
  const {
    currentTeamState,
    setCurrentTeamState
  } = useCurrentTeamState();
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
      
      if (!currentTeamState && userData?.users_by_pk?.members.length) {
        setCurrentTeamState(userData?.users_by_pk?.members?.[0]?.team);
      }
    } else {
      setCurrentUser({});
    }
  }, [currentUserData.data, setCurrentUser, currentTeamState, setCurrentTeamState]);

  const { run: execQueryCurrentUser } = useDebounceFn((context) => {
    return doQueryCurrentUser({ requestPolicy: 'cache-and-network', role, ...context });
  }, {
    wait: 500,
  });

  useUpdateEffect(() => {
    if (authToken) {
      execQueryCurrentUser();
    }
  }, [authToken, execQueryCurrentUser]);

  const { 
    subscription: sourcesSubscription,
    execSubscription: execSourcesSubscription,
  } = useSources({
    pauseQueryAll: true,
    disableSubscription: true,
  });

  const { 
    subscription: dashboardsSubscription,
    execSubscription: execDashboardsSubscription,
  } = useDashboards({
    pauseQueryAll: true,
    disableSubscription: true,
  });

  const { 
    subscription: schemasSubscription,
    execSubscription: execSchemasSubscription,
  } = useSchemas({
    pauseQueryAll: true,
    disableSubscription: true,
  });

  useUpdateEffect(() => {
    const anyData = sourcesSubscription.data || dashboardsSubscription.data || schemasSubscription.data;

    if (anyData) {
      if (currentUser && Object.keys(currentUser).length) {
        setCurrentUser({
          ...currentUser,
          ...anyData,
        });
      }

      sourcesSubscription.data = null;
      dashboardsSubscription.data = null;
      schemasSubscription.data = null;
    }
  }, [sourcesSubscription.data, dashboardsSubscription.data, schemasSubscription.data, currentUser]);

  useMount(() => {
    execSchemasSubscription();
    execSourcesSubscription();
    execDashboardsSubscription();
  });

  return {
    currentUser,
    queries: {
      currentUserData,
      execQueryCurrentUser,
    },
  };
};
