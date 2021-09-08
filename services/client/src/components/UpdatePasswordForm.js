import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, message } from 'antd';

import Loader from 'components/Loader';

import useFormItems from 'hooks/useFormItems';
import useAuth from 'hooks/useAuth';

const formConfig = {
  old_password: {
    label: 'Old Password',
    display: 'text',
    required: true,
    type: 'password',
    span: 24
  },
  new_password: {
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
    changePass,
  } = useAuth();

  const onSubmit = () => {
    const { form: formObject } = formRef.current;

    formObject.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      formObject.resetFields();
      const pass = await changePass.run(values);

      if (pass.statusCode >= 200 && pass.statusCode <= 300) {
        message.success('Password updated!');
      } else {
        message.error(pass.message);
      }
    });
  };

  const [updatePasswordForm] = useFormItems({ ref: formRef, form, config: formConfig });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Loader spinning={changePass.loading}>
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
