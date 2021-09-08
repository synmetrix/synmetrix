import React from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSetState } from 'ahooks';

import useAuth from '../hooks/useAuth';
import useAuthToken from '../hooks/useAuthToken';

import SimpleForm from '../components/SimpleForm';

import s from './Login.module.css';

const MagicLinkLogin = () => {
  const { login, register } = useAuth();
  const { doAuth } = useAuthToken();

  const { t } = useTranslation();
  const [state, setState] = useSetState({
    message: null,
    magicLink: false
  });

  const { message, magicLink } = state;

  const formConfig = {
    email: {
      label: t('Email'),
      required: true,
      type: 'string',
      span: 24,
      placeholder: t('Your Email'),
    }
  };

  const createAccount = async (values) => {
    const regRes = await register.run(values);

    if (regRes?.statusCode !== 200) {
      setState({ message: regRes?.message });
      return;
    }

    doAuth(regRes.jwt_token, regRes.refresh_token);
  };

  const handleSubmit = async (values) => {
    const loginRes = await login.run(values);

    if (loginRes?.statusCode === 400) {
      await createAccount(values);
    }

    if (loginRes?.statusCode !== 200) {
      setState({ message: loginRes?.message });
    }

    if (loginRes?.magicLink) {
      setState({
        message: 'Magic link has been sent to email',
        magicLink: true
      });
    }
  };

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <header className={s.formHeader}>MLCraft</header>

        {!magicLink && (
          <SimpleForm
            config={formConfig}
            onSubmit={handleSubmit}
            submitText={t('Send')}
            style={{ width: '100%' }}
            labelAlign="left"
            size="large"
            loading={login.loading || register.loading}
            {...layout}
          />
        )}

        {message && <div style={{ textAlign: 'center', color: 'green' }}>{message}</div>}

        <div className={s.formFooter}>
          <Link to="/login">
            <Button block type="default" size="large">
              Login with password
            </Button>
          </Link>
          <Link to="/signup">
            <Button block type="default" size="large">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

MagicLinkLogin.propTypes = {
};

MagicLinkLogin.defaultProps = {};

export default MagicLinkLogin;
