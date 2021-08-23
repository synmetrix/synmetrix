import React from 'react';

import PageInfo from 'components/PageInfo';
import Container from 'components/Container';
import UserSettings from 'components/UserSettings';

import { useRecoilValue } from 'recoil';
import { currentUser as currentUserState } from 'recoil/currentUser';

const Profile = () => {
  const currentUser = useRecoilValue(currentUserState);
  const title = `${currentUser.name} (${currentUser.email})`;

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
