import { useEffect, useMemo } from 'react';
import { useSubscription } from 'urql';
import { set } from 'unchanged';
import equals from 'utils/equals';

import { useTrackedEffect } from 'ahooks';
import useMutation from './useMutation';
import useQuery from './useQuery';

const allAccessListsQuery = `
  query ($offset: Int, $limit: Int, $where: access_lists_bool_exp, $order_by: [access_lists_order_by!]) {
    access_lists (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      access_list
      created_at
      updated_at
    }
  }
`;

const accessListsSubscription = `
  subscription ($offset: Int, $limit: Int, $where: access_lists_bool_exp, $order_by: [access_lists_order_by!]) {
    access_lists (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      access_list
      created_at
      updated_at
    }
  }
`; 

const currentAccessListQuery = `
  query ($id: uuid!) {
    access_lists_by_pk(id: $id) {
      name
      access_list
    }
  }
`;

const updateAccessListMutation = `
  mutation (
    $pk_columns: access_lists_pk_columns_input!,
    $_set: access_lists_set_input!
  ) {
    update_access_lists_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const delAccessListMutation = `
  mutation ($id: uuid!) {
    delete_access_lists_by_pk(id: $id) {
      id
    }
  }
`;

const createAccessListMutation = `
  mutation ($object: access_lists_insert_input!) {
    insert_access_lists_one(object: $object) {
      id
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

  return res;
};

const handleSubscription = (_, response) => response;

const role = 'user';
export default ({ pauseQueryAll, pagination = {}, params = {}, disableSubscription = true }) => {
  const { editId } = params;

  const [updateMutation, execUpdateMutation] = useMutation(updateAccessListMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delAccessListMutation, { role });
  const [createMutation, execCreateMutation] = useMutation(createAccessListMutation, { role });

  const [allAccessData, execAllAccessQuery] = useQuery({
    query: allAccessListsQuery,
    variables: getListVariables(pagination),
    pause: pauseQueryAll,
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [currentData, execQueryCurrent] = useQuery({
    query: currentAccessListQuery,
    variables: {
      id: editId,
    },
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

  const [subscription, execSubscription] = useSubscription({
    query: accessListsSubscription,
    variables: getListVariables(pagination),
    pause: disableSubscription,
  }, handleSubscription);

  const all = useMemo(() => allAccessData.data?.access_lists || [], [allAccessData]);
  const current = useMemo(() => currentData.data?.access_lists_by_pk, [currentData]);

  useTrackedEffect((changes, previousDeps, currentDeps) => {
    const prevData = previousDeps?.[0];
    const currData = currentDeps?.[0];

    let dataDiff = false;
    if (!prevData || !currData) {
      dataDiff = false;
    } else {
      dataDiff = !equals(prevData, currData);
    }

    if (dataDiff) {
      execAllAccessQuery({ requestPolicy: 'network-only' });
    }
  }, [subscription.data, execAllAccessQuery]);

  useEffect(() => {
    if (editId) {
      execQueryCurrent();
    }
  }, [editId, execQueryCurrent]);

  return {
    all,
    current,
    queries: {
      allAccessData, execAllAccessQuery,
      currentData, execQueryCurrent,
    },
    mutations: {
      updateMutation, execUpdateMutation,
      deleteMutation, execDeleteMutation,
      createMutation, execCreateMutation,
    },
    subscription,
    execSubscription,
  };
};
