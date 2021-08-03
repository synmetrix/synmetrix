import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'wouter';

import useAuth from 'hooks/useAuth';

import styles from './Login.module.css';

const Login = props => {
  const { 
    mutations: {
      loginMutation,
      execLoginMutation,
    }
  } = useAuth();

  const submit = e => {
    e.preventDefault();

    props.form.validateFields((err, input) => {
      if (!err) {
        execLoginMutation({ input });
      }
    });
  };

  const { form } = props;
  const { getFieldDecorator } = form;
  const errors = loginMutation?.error?.graphQLErrors || [];

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
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required' }],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <div className={styles.loginFormButtonWrapper}>
            <Button type="primary" htmlType="submit" size="large">
              Log In
            </Button>
          </div>
        </Form.Item>
      </Form>
      {!!errors.length && <div style={{ textAlign: 'center', color: 'red' }}>{errors.join(',')}</div>}
      <div className={styles.signupContainer}>
        <Link to="/signup">
          <Button block type="default" size="large">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
};

Login.defaultProps = {};

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);

export default WrappedLogin;
