import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, message } from 'antd';

import Loader from 'components/Loader';

import useFormItems from 'hooks/useFormItems';
import useAuth from 'hooks/useAuth';

const formConfig = {
  currentPassword: {
    label: 'Current Password',
    display: 'text',
    required: true,
    type: 'password',
    span: 24
  },
  password: {
    label: 'New Password',
    display: 'text',
    required: true,
    type: 'password',
    span: 24
  },
};

const UpdatePasswordForm = props => {
  const { form } = props;
  const formRef = useRef(null);

  const {
    mutations: {
      updatePasswordMutation,
      execUpdatePassMutation,
    },
  } = useAuth();

  useEffect(
    () => {
      if (updatePasswordMutation.error) {
        message.error(updatePasswordMutation.error.message);
      } else if (updatePasswordMutation.data) {
        message.success('Password updated!');
      }
    },
    [updatePasswordMutation]
  );

  const onSubmit = () => {
    const { form: formObject } = formRef.current;

    formObject.validateFields((err, values) => {
      if (err) {
        return;
      }

      formObject.resetFields();
      execUpdatePassMutation(values);
    });
  };

  const [updatePasswordForm] = useFormItems({ ref: formRef, form, config: formConfig });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Loader spinning={updatePasswordMutation.fetching}>
          {updatePasswordForm}
        </Loader>
      </Form>
      <Button type="primary" onClick={onSubmit}>Update Password</Button>
    </>
  );
};

UpdatePasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create()(UpdatePasswordForm);
