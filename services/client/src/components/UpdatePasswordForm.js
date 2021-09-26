import React from 'react';

import { useTranslation } from 'react-i18next';
import { message } from 'antd';

import SimpleForm from 'components/SimpleForm';
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

const UpdatePasswordForm = () => {
  const { t } = useTranslation();

  const {
    changePass,
  } = useAuth();

  const handleSubmit = async (values) => {
    let res = {};

    try {
      res = await changePass.run(values);
    } catch (err) {
      message.error(err.toString());
    }

    if (res?.statusCode >= 200 && res?.statusCode <= 300) {
      message.success(t('Password updated!'));
    } else if (res?.message) {
      message.error(res.message);
    }

    return null;
  };

  return (
    <SimpleForm
      config={formConfig}
      onSubmit={handleSubmit}
      submitText={t('Update password')}
      style={{ width: '100%' }}
      labelAlign="left"
      size="large"
      loading={changePass.loading}
    />
  );
};

UpdatePasswordForm.propTypes = {};

export default UpdatePasswordForm;
