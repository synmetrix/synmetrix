import React, { useState } from 'react';
import { useRequest } from 'ahooks';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useAuthToken from '../hooks/useAuthToken';
import SimpleForm from '../components/SimpleForm';

import s from './Login.module.css';

const { GRAPHQL_PLUS_SERVER_URL } = process.env;

const Login = () => {
  const { doAuth } = useAuthToken();
  const { t } = useTranslation();
  const [message, setMessage] = useState();

  const { loading, run } = useRequest(async (values) => {
    const response = await fetch(`${GRAPHQL_PLUS_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    return response.json();
  }, {
    manual: true,
  });

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
      required: true,
      display: 'text',
      type: 'password',
      span: 24,
      placeholder: t('Your Password'),
    },
  };

  const handleSubmit = async (values) => {
    const res = await run(values);

    if (res.statusCode && res.statusCode !== 200) {
      setMessage(res.message);
    } else {
      setMessage(null);
      doAuth(res.jwt_token);
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
          loading={loading}
          {...layout}
        />

        {message && <div style={{ textAlign: 'center', color: 'red' }}>{message}</div>}

        <div className={s.formFooter}>
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
