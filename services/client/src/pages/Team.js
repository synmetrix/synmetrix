import React, { useEffect, useCallback, useMemo } from 'react';
import { Button, Icon, message } from 'antd';
import { get } from 'unchanged';

import { useTranslation } from 'react-i18next';

import TeamTable from 'components/TeamTable';
import PageInfo from 'components/PageInfo';
import Container from 'components/Container';
import InviteTeamMemberModal from 'components/InviteTeamMemberModal';
import TeamSettingsModal from 'components/TeamSettingsModal';

import useLocation from 'wouter/use-location';

import useTeam from 'hooks/useTeam';
import useXState from 'hooks/useXState';
import usePermissions from 'hooks/usePermissions';

const Team = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();
  const basePath = '/d/team';

  const [state, updateState] = useXState({
    visibleInviteModal: location.includes('/invite'),
    visibleSettingsModal: location.includes('/settings'),
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

  const onModalClose = useCallback(() => {
    setLocation(basePath);
    updateState({
      visibleInviteModal: false,
      visibleSettingsModal: false
    });
  }, [setLocation, updateState]);

  const {
    currentTeamData,
    mutations: {
      updateMutation, mExecUpdateMutation,
      inviteMutation, mExecInviteMutation,
      changeMemberRoleMutation, mExecChangeMemberRoleMutation,
      toggleMemberStatusMutation, mExecToggleMemberStatusMutation,
      removeTeamMemberMutation, mExecRemoveTeamMemberMutation
    },
  } = useTeam({});
  
  const currentTeam = get('data.teamByRowId', currentTeamData);
  const { members = [], name = '' } = currentTeam || {};
  const isTeamExists = !!currentTeam;

  useEffect(
    () => {
      if (toggleMemberStatusMutation.data) {
        message.success('Member status has been updated');
      } else if (toggleMemberStatusMutation.error) {
        message.error(toggleMemberStatusMutation.error.message);
      }
    },
    [toggleMemberStatusMutation]
  );

  useEffect(
    () => {
      if (changeMemberRoleMutation.data) {
        message.success('Member role has updated');
      } else if (changeMemberRoleMutation.error) {
        message.error(changeMemberRoleMutation.error.message);
      }
    },
    [changeMemberRoleMutation]
  );

  useEffect(
    () => {
      if (inviteMutation.data) {
        message.success('New team member has been invited. Please provide the credentials to login');
        onModalClose();
      } else if (inviteMutation.error) {
        message.error(inviteMutation.error.message);
      }
    },
    [onModalClose, inviteMutation]
  );

  useEffect(
    () => {
      if (updateMutation.data) {
        message.success('Team has been updated');
        onModalClose();
      } else if (updateMutation.error) {
        message.error(updateMutation.error.message);
      }
    },
    [onModalClose, updateMutation]
  );

  const onChange = (field, memberId, value) => {
    if (field === 'teamRole') {
      mExecChangeMemberRoleMutation(memberId, value);
    } else if (field === 'active') {
      mExecToggleMemberStatusMutation(memberId, value);
    }
  };

  useEffect(
    () => {
      if (removeTeamMemberMutation.data) {
        message.success('Team member has been deleted');
      } else if (removeTeamMemberMutation.error) {
        message.error(removeTeamMemberMutation.error.message);
      }
    },
    [removeTeamMemberMutation]
  );

  const onRemove = memberId => {
    mExecRemoveTeamMemberMutation(memberId);
  };

  const { restrictScopes, fallback } = usePermissions({ scope: 'team' });

  const disableManagement = useMemo(() => restrictScopes.includes('userManagement'), [restrictScopes]);
  const loading = inviteMutation.fetching ||  
    changeMemberRoleMutation.fetching ||
    toggleMemberStatusMutation.fetching ||
    updateMutation.fetching;

  if (fallback) {
    return fallback;
  }

  return (
    <Container>
      <PageInfo
        justify={disableManagement ? 'center' : 'left'}
        title={`${name} ${t('Team')}`}
        description={(
          <>
            {!disableManagement && (
              [
                <ul>
                  <li>Manage your Team</li>
                  <li>Grant roles and manage personal access</li>
                </ul>,
                <Button style={{ marginRight: 10 }} type="primary" size="small" shape="round" onClick={() => onInviteOpen()}>
                  <Icon type="plus" />
                  {t('Invite a Team Member')}
                </Button>,
                <Button type="primary" disabled={!isTeamExists} size="small" shape="round" onClick={() => onSettingsOpen()}>
                  <Icon type="setting" />
                  {t('Team Settings')}
                </Button>
              ]
            )}
          </>
        )}
      />
      <InviteTeamMemberModal
        title={t('Invite Team Member')}
        key="invite"
        visible={state.visibleInviteModal}
        loading={loading}
        onSave={mExecInviteMutation}
        onCancel={onModalClose}
        isTeamExists={isTeamExists}
      />
      <TeamSettingsModal
        title={t('Team Settings')}
        key="settings"
        visible={state.visibleSettingsModal}
        loading={loading}
        onSave={mExecUpdateMutation}
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
