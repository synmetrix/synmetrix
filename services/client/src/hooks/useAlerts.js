import { useEffect, useMemo } from 'react';
import { set } from 'unchanged';
import { useTrackedEffect, useThrottleFn } from 'ahooks';
import { useSubscription } from 'urql';

import useQuery from './useQuery';
import useMutation from './useMutation';
import useCurrentTeamState from './useCurrentTeamState';

export const alertFragment = `
  id
  name
  delivery_type
  delivery_config
  trigger_config
  created_at
  updated_at
  schedule
  user {
    display_name
  }
  exploration {
    datasource_id
    playground_state
  }
`;

const upsertAlertWithExplorationMutation = `
  mutation ($object: explorations_insert_input!) {
    insert_explorations_one(object: $object) {
      id
    }
  }
`;

const alertsQuery = `
  query ($offset: Int, $limit: Int, $where: alerts_bool_exp, $order_by: [alerts_order_by!]) {
    alerts (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      schedule
      delivery_type
      delivery_config
      trigger_config
      created_at
      updated_at
      user {
        display_name
      }
    }
    alerts_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const editAlertQuery = `
  query ($id: uuid!) {
    alerts_by_pk(id: $id) {
      ${alertFragment}
    }
  }
`;

const delAlertMutation = `
  mutation ($id: uuid!) {
    delete_alerts_by_pk(id: $id) {
      id
    }
  }
`;

const alertsSubscription = `
  subscription ($offset: Int, $limit: Int, $where: alerts_bool_exp, $order_by: [alerts_order_by!]) {
    alerts (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      ${alertFragment}
    }
  }
`;

const getListVariables = (pagination, params = {}) => {
  let res = {
    order_by: {
      created_at: 'desc',
    },
  };

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  if (params?.teamId) {
    res = set('where.team_id._eq', params.teamId, res);
  }

  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default ({ pauseQueryAll, pagination = {}, params = {}, disableSubscription = true }) => {
  const { editId } = params;
  const { currentTeamState } = useCurrentTeamState();

  const reqParams = {
    ...params,
    teamId: currentTeamState?.id,
  };

  const [upsertMutation, execUpsertMutation] = useMutation(upsertAlertWithExplorationMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delAlertMutation, { role });

  const [allData, doQueryAll] = useQuery({
    query: alertsQuery,
    pause: true,
    variables: getListVariables(pagination, reqParams),
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const { run: execQueryAll } = useThrottleFn(() => {
    return doQueryAll();
  }, {
    wait: 500,
  });

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  useTrackedEffect((changes, prevDeps, currDeps) => {
    const prevTeam = prevDeps?.[0];
    const currTeam = currDeps?.[0];
    const currPause = currDeps?.[1];

    if (!currPause && prevTeam && currTeam && prevTeam !== currTeam) {
      execQueryAll();
    }
  }, [currentTeamState.id, pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.alerts || [], [allData.data]);
  const totalCount = useMemo(() => allData.data?.alerts_aggregate.aggregate.count, [allData.data]);

  const [currentData, execQueryCurrent] = useQuery({
    query: editAlertQuery,
    variables: {
      id: editId,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const current = useMemo(() => currentData.data?.alerts_by_pk || {}, [currentData.data]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  const [subscription, execSubscription] = useSubscription({
    query: alertsSubscription,
    variables: getListVariables(pagination),
    pause: disableSubscription,
  }, handleSubscription);

  return {
    all,
    totalCount,
    current,
    queries: {
      allData,
      execQueryAll,
      currentData,
      execQueryCurrent,
    },
    mutations: {
      upsertMutation,
      execUpsertMutation,
      deleteMutation,
      execDeleteMutation,
    },
    subscription,
    execSubscription,
  };
};
