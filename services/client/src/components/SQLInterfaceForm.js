import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { message } from 'antd';

import SimpleForm from 'components/SimpleForm';
import useSQLInterfaceConfig from '../hooks/useSQLInterfaceConfig';

const SQLInterfaceForm = (props) => {
  const { initialValues } = props;
  const { t } = useTranslation();
  const formConfig = useSQLInterfaceConfig({ initialValues });

  const handleSubmit = async (values) => {
    let res = {};

    message.success('Submitted');
    // try {
    //   res = await changePass.run(values);
    // } catch (err) {
    //   message.error(err.toString());
    // }

    // if (res?.statusCode >= 200 && res?.statusCode <= 300) {
    //   message.success(t('Password updated!'));
    // } else if (res?.message) {
    //   message.error(res.message);
    // }

    return null;
  };
  console.log(formConfig)

  return (
    <SimpleForm
      config={formConfig}
      onSubmit={handleSubmit}
      submitText={t('Create new')}
      style={{ width: '100%' }}
      labelAlign="left"
      loading={false}
    />
  );
};

SQLInterfaceForm.propTypes = {
  initialValues: PropTypes.object,
};

SQLInterfaceForm.defaultProps = {
  initialValues: {},
};

export default SQLInterfaceForm;
