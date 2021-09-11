import { useCallback, useEffect, useMemo } from 'react';
import { set } from 'unchanged';

import { getOr } from 'unchanged';
import { useSubscription } from 'urql';

import useQuery from 'hooks/useQuery';
import useMutation from 'hooks/useMutation';
import useLocation from 'hooks/useLocation';
import useAppSettings from 'hooks/useAppSettings';
import useCurrentTeamState from './useCurrentTeamState';

const newDashboardMutation = `
  mutation ($object: dashboards_insert_input!) {
    insert_dashboards_one(object: $object) {
      id
      name
    }
  }
`;

const dashboardsQuery = `
  query ($offset: Int, $limit: Int, $where: dashboards_bool_exp, $order_by: [dashboards_order_by!]) {
    dashboards (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      created_at
      updated_at
    }
    dashboards_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const editDashboardMutation = `
  mutation (
    $pk_columns: dashboards_pk_columns_input!,
    $_set: dashboards_set_input!
  ) {
    update_dashboards_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const editDashboardQuery = `
  query ($id: uuid!) {
    dashboards_by_pk(id: $id) {
      id
      name
      layout
      created_at
      updated_at
      pinned_items {
        id
      }
    }
  }
`;

const delDashboardMutation = `
  mutation ($id: uuid!) {
    delete_dashboards_by_pk(id: $id) {
      id
    }
  }
`;

const dashboardsSubscription = `
  subscription ($offset: Int, $limit: Int, $where: dashboards_bool_exp, $order_by: [dashboards_order_by!]) {
    dashboards (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      user_id
      team_id
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
export default (props = {}) => {
  const { pauseQueryAll, pagination = {}, params = {}, disableSubscription = true } = props;
  const { withAuthPrefix } = useAppSettings();
  const { currentTeamState } = useCurrentTeamState();

  const reqParams = {
    ...params,
    teamId: currentTeamState?.id,
  };

  const { editId } = params;
  const [, setLocation] = useLocation();

  const [createMutation, execCreateMutation] = useMutation(newDashboardMutation, { role });
  const [updateMutation, execUpdateMutation] = useMutation(editDashboardMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delDashboardMutation, { role });

  const [allData, execQueryAll] = useQuery({
    query: dashboardsQuery,
    pause: true,
    variables: getListVariables(pagination, reqParams),
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [subscription, execSubscription] = useSubscription({
    query: dashboardsSubscription,
    variables: getListVariables(pagination),
    pause: disableSubscription,
  }, handleSubscription);

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.dashboards || [], [allData]);
  const totalCount = useMemo(() => allData.data?.dashboards_aggregate.aggregate.count, [allData]);

  const [currentData, execQueryCurrent] = useQuery({
    query: editDashboardQuery,
    variables: {
      id: editId,
    },
    pause: true,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const current = useMemo(() => currentData.data?.dashboards_by_pk || {}, [currentData]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  const getItemGridData = useCallback((itemId) => {
    const defaultGridData = {
      x: 0,
      y: 0,
      w: 4,
      h: 6,
      minW: 2,
      minH: 4
    };

    if (!current.layout) {
      return {
        ...defaultGridData,
      };
    }

    const itemGridData = current.layout?.find((v) => parseInt(v.i, 10) === itemId);

    if (!itemGridData) {
      let lowest = 0;
      let lastKey = 0;

      current.layout.forEach((item, i) => {
        if (item.y > lowest) {
          lowest = item.y;
          lastKey = i;
        }
      });

      return {
        ...defaultGridData,
        y: lowest + getOr(6, `layout[${lastKey}].h`, current)
      };
    }
    return itemGridData;
  }, [current]);

  const onChange = useCallback((key) => {
    setLocation(withAuthPrefix(`/dashboards/${key}`));
  }, [setLocation, withAuthPrefix]);

  return {
    all,
    current,
    totalCount,
    onChange,
    getItemGridData,
    queries: {
      allData,
      execQueryAll,
      currentData,
      execQueryCurrent,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
    },
    subscription,
    execSubscription,
  };
};
