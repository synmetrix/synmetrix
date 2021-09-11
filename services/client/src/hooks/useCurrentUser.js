import { useEffect, useCallback } from 'react';

import {
  useRecoilValue,
  useRecoilState,
} from 'recoil';

import { useDebounceFn, useUpdateEffect, useMount, useTrackedEffect } from 'ahooks';

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

      members(
        order_by: { created_at: desc }
      ) {
        team {
          id
          name
        }
      }
    }

    datasources (
      order_by: { created_at: desc }
    ) {
      id
      name
      user_id
      team_id
    }

    dataschemas (
      order_by: { created_at: desc }
    ) {
      id
      user_id
      name
      checksum
      datasource {
        team_id
      }
    }

    dashboards (
      order_by: { created_at: desc }
    ) {
      id
      name
      user_id
      team_id
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

  const filterByTeam = useCallback((item) => {
    if (currentTeamState.id && item.team_id !== currentTeamState?.id) {
      return false;
    }

    return true;
  }, [currentTeamState.id]);

  useEffect(() => {
    const userData = currentUserData?.data;

    if (userData) {
      const newUserData = {
        ...userData,
        dashboards: userData.dashboards.filter(filterByTeam),
        datasources: userData.datasources.filter(filterByTeam),
      };

      setCurrentUser(newUserData);
      
      if (!currentTeamState && newUserData?.users_by_pk?.members.length) {
        setCurrentTeamState(newUserData?.users_by_pk?.members?.[0]?.team);
      }
    } else {
      setCurrentUser({});
    }
  }, [currentUserData.data, setCurrentUser, currentTeamState, setCurrentTeamState, filterByTeam]);

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

  useTrackedEffect((changes, prevDeps, currDeps) => {
    const prevTeam = prevDeps?.[0];
    const currTeam = currDeps?.[0];
    const currPause = currDeps?.[1];

    if (!currPause && prevTeam && currTeam && prevTeam !== currTeam) {
      execQueryCurrentUser();
    }
  }, [currentTeamState.id, pauseQuery, execQueryCurrentUser]);

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
        execQueryCurrentUser();
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
