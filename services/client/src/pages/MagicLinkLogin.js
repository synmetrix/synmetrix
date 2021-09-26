import React from 'react';

import { Button, message } from 'antd';
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

  const { message: errMessage, magicLink } = state;

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
    let res = {};

    try {
      res = await register.run(values);
    } catch (err) {
      message.error(err.toString());
    }

    if (res.statusCode && res.statusCode !== 200) {
      setState({ message: res.message });
    } else if (res?.jwt_token) {
      setState({ message: null });
      doAuth(res.jwt_token, res.refresh_token);
    }
  };

  const handleSubmit = async (values) => {
    let res = {};

    try {
      res = await login.run(values);
    } catch (err) {
      message.error(err.toString());
    }

    if (res?.statusCode === 400) {
      return createAccount(values);
    }

    if (res?.statusCode !== 200) {
      setState({ message: res?.message });
    }

    if (res?.magicLink) {
      setState({
        message: t('Magic link has been sent to email'),
        magicLink: true
      });
    }

    return null;
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

        {errMessage && <div style={{ textAlign: 'center', color: 'green' }}>{errMessage}</div>}

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
