import React from 'react';

import PageInfo from 'components/PageInfo';
import Container from 'components/Container';
import UserSettings from 'components/UserSettings';

import useAuthContext from 'hooks/useAuthContext';

const Profile = () => {
  const currentUser = useAuthContext();
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
