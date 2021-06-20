import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation } from 'urql';
import { get } from 'unchanged';

import trackEvent from 'utils/trackEvent';

import useAuthContext from './useAuthContext';

const TeamQuery = `
  query TeamQuery($rowId: Int!) {
    teamByRowId(rowId: $rowId) {
      name
      memberIds
      members {
        rowId
        email
        name
        teamRole
        active
        createdAt
        updatedAt
      }
    }
  }
`;

const inviteTeamMember = `
  mutation InviteMutation($input: InviteTeamMemberInput!) {
    inviteTeamMember(input: $input) {
      teamId
    }
  }
`;

const changeMemberRole = `
  mutation ChangeMemberRoleMutation($input: TeamMemberRoleInput!) {
    changeMemberRole(input: $input) {
      teamRole
    }
  }
`;

const toggleStatus = `
  mutation ToggleTeamMemberMutation($input: ToggleUserStatusInput!) {
    toggleUserStatus(input: $input) {
      newStatus
    }
  }
`;

const updateTeam = `
  mutation EditTeamMutation($input: UpdateTeamByRowIdInput!) {
    updateTeamByRowId(input: $input) {
      team {
        rowId
        name
      }
    }
  }
`;

const removeTeamMember = `
  mutation RemoveTeamMemberMutation($input: RemoveTeamMemberInput!) {
    removeTeamMember(input: $input)
  }
`;

export default () => {
  const currentUser = useAuthContext();

  const [inviteMutation, execInviteMutation] = useMutation(inviteTeamMember);
  const mExecInviteMutation = useCallback(input => {
    trackEvent('Invite a team member');

    return execInviteMutation({ input });
  }, [execInviteMutation]);

  const teamId = useMemo(() => currentUser.teamId || get('data.inviteTeamMember.teamId', inviteMutation), [inviteMutation, currentUser]);

  const [currentTeamData, executeQueryTeam] = useQuery({
    query: TeamQuery,
    variables: {
      rowId: teamId,
    },
    requestPolicy: 'cache-and-network'
  });

  const [updateMutation, execUpdateMutation] = useMutation(updateTeam);
  const mExecUpdateMutation = useCallback(teamPatch => {
    trackEvent('Update Team');

    return execUpdateMutation({ input: { rowId: teamId, teamPatch } });
  }, [execUpdateMutation, teamId]);

  const [changeMemberRoleMutation, execChangeMemberRoleMutation] = useMutation(changeMemberRole);
  const mExecChangeMemberRoleMutation = useCallback((userId, teamRole) => {
    trackEvent('Change member role');

    return execChangeMemberRoleMutation({ input: { userId, teamRole } });
  }, [execChangeMemberRoleMutation]);

  const [toggleMemberStatusMutation, execToggleMemberStatusMutation] = useMutation(toggleStatus);
  const mExecToggleMemberStatusMutation = useCallback((userId, status) => {
    trackEvent('Change member status');

    return execToggleMemberStatusMutation({ input: { userId, status } });
  }, [execToggleMemberStatusMutation]);

  const [removeTeamMemberMutation, execRemoveTeamMember] = useMutation(removeTeamMember);
  const mExecRemoveTeamMemberMutation = useCallback((userId) => {
    trackEvent('Remove team member');

    return execRemoveTeamMember({ input: { userId } });
  }, [execRemoveTeamMember]);

  useEffect(() => {
    const dataUpdated = toggleMemberStatusMutation.data ||
      changeMemberRoleMutation.data ||
      inviteMutation.data ||
      updateMutation.data ||
      removeTeamMemberMutation.data;

    if (dataUpdated) {
      executeQueryTeam({ requestPolicy: 'network-only' });
    }
  }, [
    executeQueryTeam,
    toggleMemberStatusMutation,
    changeMemberRoleMutation,
    inviteMutation,
    teamId,
    updateMutation,
    removeTeamMemberMutation
  ]);

  return {
    currentTeamData,
    mutations: {
      updateMutation, mExecUpdateMutation,
      inviteMutation, mExecInviteMutation,
      changeMemberRoleMutation, mExecChangeMemberRoleMutation,
      toggleMemberStatusMutation, mExecToggleMemberStatusMutation,
      removeTeamMemberMutation, mExecRemoveTeamMemberMutation
    }
  };
};
