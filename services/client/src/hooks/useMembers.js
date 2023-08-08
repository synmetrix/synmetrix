import { useEffect, useMemo } from 'react';
import { useQuery, useMutation } from 'urql';
import { set } from 'unchanged';

const allMembersQuery = `
  query ($offset: Int, $limit: Int, $where: members_bool_exp, $order_by: [members_order_by!]) {
    members (offset: $offset, limit: $limit, where: $where, order_by: $order_by) {
      id
      user {
        id
        display_name
      }
      member_roles {
        id
        team_role
        access_list {
          id
          name
        }
      }
    }
  }
`;

const editMemberMutation = `
  mutation (
    $pk_columns: members_pk_columns_input!,
    $_set: members_set_input!
  ) {
    update_members_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const editMemberRoleMutation = `
  mutation (
    $pk_columns: member_roles_pk_columns_input!,
    $_set: member_roles_set_input!
  ) {
    update_member_roles_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const delMemberMutation = `
  mutation ($id: uuid!) {
    delete_members_by_pk(id: $id) {
      id
    }
  }
`;

const inviteMemberMutation = `
  mutation ($email: String!, $teamId: uuid!, $role: String) {
    invite_team_member(email: $email, teamId: $teamId, role: $role) {
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

  const [updateMutation, execUpdateMutation] = useMutation(editMemberMutation, { role });
  const [updateRoleMutation, execUpdateRoleMutation] = useMutation(editMemberRoleMutation, { role });
  const [deleteMutation, execDeleteMutation] = useMutation(delMemberMutation, { role });
  const [inviteMutation, execInviteMutation] = useMutation(inviteMemberMutation, { role });

  const [allData, execQueryAll] = useQuery({
    query: allMembersQuery,
    pause: true,
    variables: getListVariables(pagination, params),
  }, {
    requestPolicy: 'cache-and-network',
    role,
  });

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
      updateRoleMutation,
      execUpdateRoleMutation,
      inviteMutation,
      execInviteMutation,
    },
  };
};
