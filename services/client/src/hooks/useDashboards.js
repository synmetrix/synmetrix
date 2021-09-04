import { useCallback, useEffect, useMemo } from 'react';

import { getOr } from 'unchanged';
import { useQuery, useMutation, useSubscription } from 'urql';
import useLocation from './useLocation';

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
    }
  }
`;

const getListVariables = (pagination) => {
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

  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default (props = {}) => {
  const { pauseQueryAll, pagination = {}, params = {}, disableSubscription = true } = props;

  const { editId } = params;
  const [, setLocation] = useLocation();

  const [createMutation, doCreateMutation] = useMutation(newDashboardMutation);
  const execCreateMutation = useCallback((input) => {
    return doCreateMutation(input, { role });
  }, [doCreateMutation]);

  const [updateMutation, doUpdateMutation] = useMutation(editDashboardMutation);
  const execUpdateMutation = useCallback((input) => {
    doUpdateMutation(input, { role });
  }, [doUpdateMutation]);

  const [deleteMutation, doDeleteMutation] = useMutation(delDashboardMutation);
  const execDeleteMutation = useCallback((input) => {
    doDeleteMutation(input, { role });
  }, [doDeleteMutation]);

  const [allData, doQueryAll] = useQuery({
    query: dashboardsQuery,
    pause: true,
    variables: getListVariables(pagination),
  });

  const [subscription, execSubscription] = useSubscription({
    query: dashboardsSubscription,
    variables: getListVariables(pagination),
    pause: disableSubscription,
  }, handleSubscription);

  const execQueryAll = useCallback((context) => {
    doQueryAll({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryAll]);

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.dashboards || [], [allData]);
  const totalCount = useMemo(() => allData.data?.dashboards_aggregate.aggregate.count, [allData]);

  const [currentData, doQueryCurrent] = useQuery({
    query: editDashboardQuery,
    variables: {
      id: editId,
    },
    pause: true,
  });

  const execQueryCurrent = useCallback((context) => {
    doQueryCurrent({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryCurrent]);

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
    setLocation(`/d/dashboards/${key}`);
  }, [setLocation]);

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
