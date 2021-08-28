import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useSubscription } from 'urql';
import { set } from 'unchanged';

const newSchemaMutation = `
  mutation ($object: members_insert_input!) {
    insert_members_one(object: $object) {
      id
      name
    }
  }
`;

const allMembersQuery = `
  query ($offset: Int, $limit: Int, $where: members_bool_exp, $order_by: [members_order_by!]) {
    members (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
      code
      created_at
      updated_at
    }
    members_aggregate (where: $where) {
      aggregate {
        count
      }
    }
  }
`;

const editSchemaMutation = `
  mutation (
    $pk_columns: members_pk_columns_input!,
    $_set: members_set_input!
  ) {
    update_members_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const delSchemaMutation = `
  mutation ($id: uuid!) {
    delete_members_by_pk(id: $id) {
      id
    }
  }
`;

const inviteMemberMutation = `
  mutation ($recipients: [String!]) {
    invite_members(recipients: $recipients) {
      message
    }
  }
`;

const allMembersSubscription = `
  subscription ($offset: Int, $limit: Int, $where: members_bool_exp, $order_by: [members_order_by!]) {
    members (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      name
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

const handleSubscription = (_, response) => response;

const role = 'user';
export default (props = {}) => {
  const { pauseQueryAll, pagination = {}, params = {}, disableSubscription = true } = props;

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

  const [inviteMutation, doInviteMutation] = useMutation(inviteMemberMutation);
  const execInviteMutation = useCallback((input) => {
    doInviteMutation(input, { role });
  }, [doInviteMutation]);

  const [allData, doQueryAll] = useQuery({
    query: allMembersQuery,
    pause: true,
    variables: getListVariables(pagination, params),
  });

  const [subscription] = useSubscription({
    query: allMembersSubscription,
    variables: getListVariables(pagination, params),
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

  const all = useMemo(() => allData.data?.members || [], [allData]);
  const totalCount = useMemo(() => allData.data?.members_aggregate.aggregate.count, [allData]);

  return {
    all,
    totalCount,
    queries: {
      allData,
      execQueryAll,
    },
    mutations: {
      createMutation,
      execCreateMutation,
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
      inviteMutation,
      execInviteMutation,
    },
    subscription,
  };
};
