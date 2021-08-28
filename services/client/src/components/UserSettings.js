import React, { useCallback } from 'react';
import { Button, Icon, message, Row, Col, Card } from 'antd';

import { useTranslation } from 'react-i18next';

import UpdatePasswordForm from 'components/UpdatePasswordForm';

import useAuth from 'hooks/useAuth';
import useAuthToken from 'hooks/useAuthToken';

const Profile = () => {
  const { t } = useTranslation();

  const { 
    revoke,
  } = useAuth();

  const { cleanTokens } = useAuthToken();

  const revokeTokens = useCallback(async () => {
    const data = await revoke.run();

    if (data.statusCode >= 200 && data.statusCode <= 300) {
      message.success('All tokens expired');
      cleanTokens();
    } else {
      message.error(data.message);
    }
  }, [cleanTokens, revoke]);

  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Card title="Security" bordered={false}>
            <UpdatePasswordForm />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={12}>
          <Card title="Active sessions" bordered={false}>
            <Button type="primary" onClick={() => revokeTokens()}>
              <Icon type="logout" />
              {t('Logout from all sessions')}
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

Profile.propTypes = {};
Profile.defaultProps = {};

export default Profile;
