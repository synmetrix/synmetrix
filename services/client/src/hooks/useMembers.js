import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from 'urql';
import { set } from 'unchanged';
import useCurrentTeamState from './useCurrentTeamState';

const allMembersQuery = `
  query ($offset: Int, $limit: Int, $where: members_bool_exp, $order_by: [members_order_by!]) {
    members (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      user {
        display_name
      }
      member_roles {
        team_role
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
  mutation ($email: String!, $teamId: uuid!) {
    invite_team_member(email: $email, teamId: $teamId) {
      memberId
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

  if (params.teamId) {
    res = set('where.team_id._eq', params.teamId, res);
  }

  return res;
};

const role = 'user';
export default (props = {}) => {
  const { pauseQueryAll, pagination = {}, params = {} } = props;

  const { currentTeamState } = useCurrentTeamState();

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
    const { email } = input;
    const teamId = currentTeamState?.id;

    doInviteMutation({ teamId, email }, { role });
  }, [doInviteMutation, currentTeamState]);

  const [allData, doQueryAll] = useQuery({
    query: allMembersQuery,
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

  useEffect(() => {
    if (inviteMutation.data || deleteMutation.data) {
      execQueryAll();
    }
  }, [execQueryAll, inviteMutation, deleteMutation]);

  const all = useMemo(() => allData.data?.members || [], [allData]);

  return {
    all,
    queries: {
      allData,
      execQueryAll,
    },
    mutations: {
      deleteMutation,
      execDeleteMutation,
      updateMutation,
      execUpdateMutation,
      inviteMutation,
      execInviteMutation,
    },
  };
};
