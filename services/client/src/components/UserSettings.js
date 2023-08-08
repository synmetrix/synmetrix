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
    let data = {};

    try {
      data = await revoke.run();
    } catch (err) {
      message.error(err.toString());
    }

    if (data?.statusCode >= 200 && data?.statusCode <= 300) {
      message.success(t('All tokens expired'));
      cleanTokens();
    } else if (data?.message) {
      message.error(data.message);
    }
  }, [cleanTokens, revoke, t]);

  return (
    <>
      <Row>
        <Col offset={6} span={12}>
          <Card title={t('Security')} bordered={false}>
            <UpdatePasswordForm />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col offset={6} span={12}>
          <Card title={t('Active sessions')} bordered={false}>
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
