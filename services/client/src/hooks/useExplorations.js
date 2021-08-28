import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from 'urql';
import { set } from 'unchanged';
import useLocation from './useLocation';

const newExplorationMutation = `
  mutation ($object: explorations_insert_input!) {
    insert_explorations_one(object: $object) {
      id
      name
    }
  }
`;

const allExplorationsQuery = `
  query ($offset: Int, $limit: Int, $where: explorations_bool_exp, $order_by: [explorations_order_by!]) {
    explorations (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      code
      created_at
      updated_at
    }
    explorations_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const editExplorationQuery = `
  query ($id: uuid!) {
    explorations_by_pk(id: $id) {
      id
      name
      code
      created_at
      updated_at
    }
  }
`;

const getListVariables = (pagination, params) => {
  let res = {
    order_by: {
      created_at: 'asc',
    },
  };

  if (pagination) {
    res = {
      ...res,
      ...pagination,
    };
  }

  if (params.dataSourceId) {
    res = set('where.datasource_id._eq', params.dataSourceId, res);
  }
  
  return res;
};

const role = 'user';
export default ({ pauseQueryAll, pagination = {}, params = {} }) => {
  const [, setLocation] = useLocation();
  const { editId, dataSourceId } = params;

  const [createMutation, doCreateMutation] = useMutation(newExplorationMutation);
  const execCreateMutation = useCallback((input) => {
    return doCreateMutation(input, { role });
  }, [doCreateMutation]);

  const [allData, doQueryAll] = useQuery({
    query: allExplorationsQuery,
    pause: true,
    variables: getListVariables(pagination, params),
  });

  const execQueryAll = useCallback((context) => {
    doQueryAll({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryAll]);

  useEffect(() => {
    if (!pauseQueryAll) {
      execQueryAll();
    }
  }, [pauseQueryAll, execQueryAll]);

  const all = useMemo(() => allData.data?.explorations || [], [allData]);
  const totalCount = useMemo(() => allData.data?.explorations_aggregate.aggregate.count, [allData]);

  const [currentData, doQueryCurrent] = useQuery({
    query: editExplorationQuery,
    variables: {
      id: editId,
    },
    pause: true,
  });

  const execQueryCurrent = useCallback((context) => {
    doQueryCurrent({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryCurrent]);

  const current = useMemo(() => currentData.data?.explorations_by_pk || {}, [currentData]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  const reset = useCallback(
    (explorationId) => setLocation(`/d/explore/${dataSourceId}/${explorationId}`),
    [dataSourceId, setLocation],
  );

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
      createMutation,
      execCreateMutation,
    },
    reset,
  };
};
