import React from 'react';

import PageInfo from 'components/PageInfo';
import Container from 'components/Container';
import UserSettings from 'components/UserSettings';

import useCurrentUserState from 'hooks/useCurrentUserState';

const Profile = () => {
  const { currentUserState } = useCurrentUserState();
  const title = `${currentUserState.users_by_pk?.full_name || ''} (${currentUserState.users_by_pk?.display_name})`.trim();

  return (
    <Container>
      <PageInfo
        justify="center"
        title={title}
      />
      <UserSettings />
    </Container>
  );
};

Profile.propTypes = {};
Profile.defaultProps = {};

export default Profile;
