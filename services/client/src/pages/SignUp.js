import React, { useState } from 'react';
import { useRequest } from 'ahooks';

import { Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// import useAuth from '../hooks/useAuth';
// import useXState from '../hooks/useXState';

import SimpleForm from '../components/SimpleForm';

import s from './Login.module.css';

const { GRAPHQL_PLUS_SERVER_URL } = process.env;

const SignUp = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState();

  const { loading, run } = useRequest((values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return {
      url: `${GRAPHQL_PLUS_SERVER_URL}/auth/register`,
      method: 'post',
      body: formData,
    };
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
    run(values);
  };

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  return (
    <div className={s.container}>
      <div className={s.formContainer}>
        <header className={s.formHeader}>MLCraft / Sign Up</header>

        <SimpleForm
          config={formConfig}
          onSubmit={handleSubmit}
          submitText={t('Sign Up')}
          style={{ width: '100%' }}
          labelAlign="left"
          size="large"
          {...layout}
        />

        {message && <div style={{ textAlign: 'center', color: 'red' }}>{message}</div>}

        <div className={s.formFooter}>
          <Link to="/login">
            <Button block type="default" size="large" loading={loading}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
};

SignUp.defaultProps = {};

export default SignUp;
