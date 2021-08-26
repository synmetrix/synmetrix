import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useSubscription } from 'urql';

const newSchemaMutation = `
  mutation ($object: dataschemas_insert_input!) {
    insert_dataschemas_one(object: $object) {
      id
      name
    }
  }
`;

const allSchemasQuery = `
  query ($offset: Int, $limit: Int, $where: dataschemas_bool_exp, $order_by: [dataschemas_order_by!]) {
    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      created_at
      updated_at
    }
    dataschemas_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const editSchemaMutation = `
  mutation (
    $pk_columns: dataschemas_pk_columns_input!,
    $_set: dataschemas_set_input!
  ) {
    update_dataschemas_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const editSchemaQuery = `
  query ($id: uuid!) {
    dataschemas_by_pk(id: $id) {
      id
      name
      db_type
      db_params
      created_at
      updated_at
    }
  }
`;

const delSchemaMutation = `
  mutation ($id: uuid!) {
    delete_dataschemas_by_pk(id: $id) {
      id
    }
  }
`;

const allSchemasSubscription = `
  subscription ($offset: Int, $limit: Int, $where: dataschemas_bool_exp, $order_by: [dataschemas_order_by!]) {
    dataschemas (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
    }
  }
`;

const getListVariables = (pagination) => {
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

  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default ({ pauseQueryAll, pagination = {}, params = {}, disableSubscription = true }) => {
  const { editId } = params;

  const [createMutation, doCreateMutation] = useMutation(newSchemaMutation);
  const execCreateMutation = useCallback((input) => {
    return doCreateMutation(input, { role });
  }, [doCreateMutation]);

  const [updateMutation, doUpdateMutation] = useMutation(editSchemaMutation);
  const execUpdateMutation = useCallback((input) => {
    doUpdateMutation(input, { role });
  }, [doUpdateMutation]);

  const [deleteMutation, doDeleteMutation] = useMutation(delSchemaMutation);
  const execDeleteMutation = useCallback((input) => {
    doDeleteMutation(input, { role });
  }, [doDeleteMutation]);

  const [allData, doQueryAll] = useQuery({
    query: allSchemasQuery,
    pause: true,
    variables: getListVariables(pagination),
  });

  const [subscription] = useSubscription({
    query: allSchemasSubscription,
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

  const all = useMemo(() => allData.data?.dataschemas || [], [allData]);
  const totalCount = useMemo(() => allData.data?.dataschemas_aggregate.aggregate.count, [allData]);

  const [currentData, doQueryCurrent] = useQuery({
    query: editSchemaQuery,
    variables: {
      id: editId,
    },
    pause: true,
  });

  const execQueryCurrent = useCallback((context) => {
    doQueryCurrent({ requestPolicy: 'cache-and-network', role, ...context });
  }, [doQueryCurrent]);

  const current = useMemo(() => currentData.data?.dataschemas_by_pk || {}, [currentData]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  return {
    all,
    current,
    totalCount,
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
  };
};
