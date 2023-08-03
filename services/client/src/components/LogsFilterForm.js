import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SimpleForm from './SimpleForm';

const LogsFilterForm = ({ onChange, initialValues }) => {
  const { t } = useTranslation();

  const formConfig = {
    from: {
      label: t('From'),
      display: 'date',
      span: 4,
      showTime: true,
      allowClear: true,
    },
    to: {
      label: t('To'),
      display: 'date',
      span: 4,
      showTime: true,
      allowClear: true,
    },
    sort: {
      label: t('Sort by duration'),
      display: 'select',
      span: 4,
      allowClear: true,
      values: [{ [t('Asc')]: 'asc' }, { [t('Desc')]: 'desc' }],
    },
  };

  return <SimpleForm config={formConfig} onSubmit={onChange} initialValues={initialValues} autoSubmit />;
};

LogsFilterForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LogsFilterForm;
