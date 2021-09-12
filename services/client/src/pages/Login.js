import React, { useState } from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useAuthToken from '../hooks/useAuthToken';
import useAuth from '../hooks/useAuth';
import SimpleForm from '../components/SimpleForm';

import s from './Login.module.css';

const Login = () => {
  const { doAuth } = useAuthToken();
  const { login } = useAuth();

  const { t } = useTranslation();
  const [message, setMessage] = useState();

  const formConfig = {
    email: {
      label: t('Email'),
      required: true,
      type: 'string',
      span: 24,
      placeholder: t('Your Email'),
    },
    password: {
      label: t('Password'),
      required: false,
      display: 'text',
      type: 'password',
      span: 24,
      placeholder: t('Your Password'),
    },
  };

  const handleSubmit = async (values) => {
    const res = await login.run(values);

    if (res.statusCode && res.statusCode !== 200) {
      setMessage(res.message || res.error);

      if (res.error === 'Bad Request' && !res.message) {
        setMessage(t('Use magic link to login'));
      }
    } else {
      setMessage(null);
      doAuth(res.jwt_token, res.refresh_token);
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

        <SimpleForm
          config={formConfig}
          onSubmit={handleSubmit}
          submitText={t('Login')}
          style={{ width: '100%' }}
          labelAlign="left"
          size="large"
          loading={login.loading}
          {...layout}
        />

        {message && <div style={{ textAlign: 'center', color: 'red' }}>{message}</div>}

        <div className={s.formFooter}>
          <Link to="/link_login">
            <Button block type="default" size="large">
              Login with magic link
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

Login.propTypes = {
};

Login.defaultProps = {};

export default Login;
