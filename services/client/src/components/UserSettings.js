import React, { useCallback } from 'react';
import { Button, Icon, message, Row, Col, Card } from 'antd';

import { useTranslation } from 'react-i18next';

import UpdatePasswordForm from 'components/UpdatePasswordForm';

import useAuth from 'hooks/useAuth';

const Profile = () => {
  const { t } = useTranslation();

  const { 
    mutations: {
      revokeMutation,
      execRevokeJWTMutation,
    }
  } = useAuth();

  const revokeTokens = useCallback(() => {
    execRevokeJWTMutation();

    if (revokeMutation.data) {
      message.success('Access tokens has been revoked');
    } else if (revokeMutation.error) {
      message.success('Something went wrong');
    }
  }, [revokeMutation, execRevokeJWTMutation]);

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
