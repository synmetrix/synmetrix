import { useEffect, useMemo } from 'react';
import { set } from 'unchanged';
import { useTrackedEffect, useThrottleFn } from 'ahooks';
import { useSubscription } from 'urql';

import useQuery from './useQuery';
import useMutation from './useMutation';
import useCurrentTeamState from './useCurrentTeamState';

export const reportFragment = `
  id
  name
  schedule
  delivery_type
  delivery_config
  created_at
  updated_at
  exploration {
    datasource_id
    playground_state
  }
`;

const upsertReportWithExplorationMutation = `
  mutation ($object: explorations_insert_input!) {
    insert_explorations_one(object: $object) {
      id
    }
  }
`;

const reportsQuery = `
  query ($offset: Int, $limit: Int, $where: reports_bool_exp, $order_by: [reports_order_by!]) {
    reports (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      schedule
      delivery_type
      delivery_config
      created_at
      updated_at
    }
    reports_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const editReportQuery = `
  query ($id: uuid!) {
    reports_by_pk(id: $id) {
      ${reportFragment}
    }
  }
`;

const delReportMutation = `
  mutation ($id: uuid!) {
    delete_reports_by_pk(id: $id) {
      id
    }
  }
`;

const reportsSubscription = `
  subscription ($offset: Int, $limit: Int, $where: reports_bool_exp, $order_by: [reports_order_by!]) {
    reports (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      ${reportFragment}
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

  const [upsertMutation, execUpsertMutation] = useMutation(upsertReportWithExplorationMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delReportMutation, { role });

  const [allData, doQueryAll] = useQuery({
    query: reportsQuery,
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

  const all = useMemo(() => allData.data?.reports || [], [allData.data]);
  const totalCount = useMemo(() => allData.data?.reports_aggregate.aggregate.count, [allData.data]);

  const [currentData, execQueryCurrent] = useQuery({
    query: editReportQuery,
    variables: {
      id: editId,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const current = useMemo(() => currentData.data?.reports_by_pk || {}, [currentData.data]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  const [subscription, execSubscription] = useSubscription({
    query: reportsSubscription,
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
