import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

import useAuth from 'hooks/useAuth';
import useAuthToken from 'hooks/useAuthToken';

import styles from './Login.module.css';

const SignUp = props => {
  const { signUpData, executeSignUpMutation } = useAuth();
  const { setAuthToken } = useAuthToken();

  const submit = e => {
    e.preventDefault();

    props.form.validateFields((err, input) => {
      if (!err) {
        setAuthToken(null);
        executeSignUpMutation({ input });
      }
    });
  };

  const { form } = props;
  const { getFieldDecorator } = form;

  const { errors } = signUpData;

  return (
    <div className={styles.loginContainer}>
      <header className={styles.formHeader}>MLCraft</header>
      <Form onSubmit={submit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Email is required' },
              {
                type: 'email',
                message: 'Email is not valid',
              },
            ],
          })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: false }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('passwordConfirm', {
            rules: [{ required: true, message: 'Password Confirmation is required' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password confirmation"
            />
          )}
        </Form.Item>
        <Form.Item>
          <div className={styles.loginFormButtonWrapper}>
            <Button type="primary" htmlType="submit" size="large">
              Sign Up
            </Button>
          </div>
        </Form.Item>
      </Form>
      {!!errors.length && <div style={{ textAlign: 'center', color: 'red' }}>{errors.join(',')}</div>}
    </div>
  );
};

SignUp.propTypes = {
  form: PropTypes.object.isRequired,
};

SignUp.defaultProps = {};

const WrappedLogin = Form.create({ name: 'normal_login' })(SignUp);

export default WrappedLogin;
