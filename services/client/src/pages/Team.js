import React, { useEffect, useCallback, useMemo } from 'react';
import { Button, Icon, message } from 'antd';

import { useTranslation } from 'react-i18next';
import { useSetState } from 'ahooks';

import TeamTable from 'components/TeamTable';
import PageInfo from 'components/PageInfo';
import Container from 'components/Container';
import InviteTeamMemberModal from 'components/InviteTeamMemberModal';
import TeamSettingsModal from 'components/TeamSettingsModal';

import useCurrentUser from 'hooks/useCurrentUser';
import useLocation from 'hooks/useLocation';
import useCheckResponse from 'hooks/useCheckResponse';
import useTeams from 'hooks/useTeams';
import useMembers from 'hooks/useMembers';
import usePermissions from 'hooks/usePermissions';
import useAppSettings from 'hooks/useAppSettings';
import useCurrentTeamState from 'hooks/useCurrentTeamState';

const Team = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const basePath = withAuthPrefix('/team');
  const { currentTeamState: currentTeam, setCurrentTeamState } = useCurrentTeamState();

  const isNewTeam = location.pathname.includes('/new');

  const [state, updateState] = useSetState({
    visibleInviteModal: location.pathname.includes('/invite'),
    visibleSettingsModal: location.pathname.includes('/settings') || isNewTeam,
  });

  useEffect(
    () => updateState({ visibleInviteModal: state.visibleInviteModal }),
    [updateState, state.visibleInviteModal]
  );

  const onInviteOpen = () => {
    setLocation(`${basePath}/invite`);
    updateState({ visibleInviteModal: true });
  };

  const onSettingsOpen = () => {
    setLocation(`${basePath}/settings`);
    updateState({ visibleSettingsModal: true });
  };

  useEffect(() => {
    if (isNewTeam) {
      updateState({ visibleSettingsModal: true });
    }
  }, [isNewTeam, updateState]);

  const onModalClose = useCallback(() => {
    setLocation(basePath);
    updateState({
      visibleInviteModal: false,
      visibleSettingsModal: false
    });
  }, [basePath, setLocation, updateState]);

  const {
    mutations: {
      createMutation: createTeamMutation,
      execCreateMutation: execCreateTeamMutation,
      updateMutation: updateTeamMutation,
      execUpdateMutation: execUpdateTeamMutation,
    }
  } = useTeams();

  const {
    all: members,
    queries: {
      execQueryAll,
    },
    mutations: {
      updateMutation,
      execUpdateMutation,
      inviteMutation,
      execInviteMutation,
      deleteMutation,
      execDeleteMutation,
    }
  } = useMembers({
    params: {
      teamId: currentTeam?.id,
    },
  });
  
  const isTeamExists = !!currentTeam?.id;

  const onUpdate = (res) => {
    if (res) {
      const team = res?.update_teams_by_pk || res.create_team;

      if (team) {
        setCurrentTeamState(team);
      }

      execQueryAll();
    }
  };

  useCheckResponse(updateMutation, onUpdate, {
    successMessage: t('Member updated'),
  });

  const closeModal = (res) => {
    if (res) {
      onModalClose();
    }

    onUpdate(res);
  };

  const onDelete = (res) => {
    if (res.delete_members_by_pk) {
      message.success(t('Team member has been deleted'));
      onUpdate(res);
    } else if (res.delete_members_by_pk === null) {
      message.error(t('You have no permissions'));
    }
  };

  useCheckResponse(createTeamMutation, closeModal, {
    successMessage: t('New team has been created'),
  });

  useCheckResponse(inviteMutation, closeModal, {
    successMessage: t('New team member has been invited'),
  });

  useCheckResponse(deleteMutation, onDelete, {
    successMessage: null,
  });

  useCheckResponse(updateTeamMutation, closeModal, {
    successMessage: t('Team has been updated'),
  });

  const onChange = (field, memberId, value) => {
    execUpdateMutation({
      pk_columns: memberId,
      _set: {
        roles: [value]
      },
    });
  };

  const onSave = (values) => {
    if (isNewTeam) {
      execCreateTeamMutation(values);
    } else {
      execUpdateTeamMutation({ 
        pk_columns: { id: currentTeam?.id },
        _set: values,
      });
    }
  };

  const onRemove = memberId => {
    execDeleteMutation({ id: memberId });
  };

  const { restrictScopes, fallback } = usePermissions({ scope: 'team' });

  const disableManagement = useMemo(() => restrictScopes.includes('userManagement'), [restrictScopes]);
  const loading = inviteMutation.fetching ||  updateMutation.fetching || updateTeamMutation.fetching;

  const onInvite = data => {
    const { email } = data;
    const teamId = currentTeam?.id;

    return execInviteMutation({ teamId, email });
  };

  if (fallback) {
    return fallback;
  }

  return (
    <Container>
      <PageInfo
        justify={disableManagement ? 'center' : 'start'}
        title={`${currentTeam?.name || ''} ${t('Team')}`.trim()}
        description={(
          <>
            {!disableManagement && (
              <>
                <ul>
                  <li>{t('Manage your Team')}</li>
                  <li>{t('Grant roles and manage personal access')}</li>
                </ul>
                <Button style={{ marginRight: 10 }} disabled={!isTeamExists} type="primary" size="small" shape="round" onClick={() => onInviteOpen()}>
                  <Icon type="plus" />
                  {t('Invite Team Member')}
                </Button>
                <Button type="primary" disabled={!isTeamExists} size="small" shape="round" onClick={() => onSettingsOpen()}>
                  <Icon type="setting" />
                  {t('Team Settings')}
                </Button>
              </>
            )}
          </>
        )}
      />
      <InviteTeamMemberModal
        title={t('Invite Team Member')}
        key="invite"
        visible={state.visibleInviteModal}
        loading={loading}
        onSave={onInvite}
        onCancel={onModalClose}
        isTeamExists={isTeamExists}
      />
      <TeamSettingsModal
        title={isNewTeam ? t('New Team') : t('Team Settings')}
        key="settings"
        visible={state.visibleSettingsModal}
        loading={loading}
        onSave={onSave}
        onCancel={onModalClose}
        currentTeam={currentTeam}
      />
      <TeamTable
        onChange={onChange}
        onRemove={onRemove}
        disableManagement={disableManagement}
        loading={loading}
        data={members}
      />
    </Container>
  );
};

Team.propTypes = {};
Team.defaultProps = {};

export default Team;
