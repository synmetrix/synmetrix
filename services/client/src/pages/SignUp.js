import React, { useState } from 'react';

import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useAuthToken from '../hooks/useAuthToken';
import useAuth from '../hooks/useAuth';
import SimpleForm from '../components/SimpleForm';

import s from './Login.module.css';

const SignUp = () => {
  const { doAuth } = useAuthToken();
  const { register } = useAuth();

  const { t } = useTranslation();
  const [state, setState] = useState();

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
    let res = {};

    try {
      res = await register.run(values);
    } catch (err) {
      message.error(err.toString());
    }

    if (res.statusCode && res.statusCode !== 200) {
      setState(res.message);
    } else if (res?.jwt_token) {
      setState(null);
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
        <header className={s.formHeader}>MLCraft / Sign Up</header>

        <SimpleForm
          config={formConfig}
          onSubmit={handleSubmit}
          submitText={t('Sign Up')}
          style={{ width: '100%' }}
          labelAlign="left"
          size="large"
          loading={register.loading}
          {...layout}
        />

        {state && <div style={{ textAlign: 'center', color: 'red' }}>{state}</div>}

        <div className={s.formFooter}>
          <Link to="/login">
            <Button block type="default" size="large" loading={register.loading}>
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
