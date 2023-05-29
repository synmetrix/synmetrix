import React from 'react';
import PropTypes from 'prop-types';

import SimpleForm from './SimpleForm';

const LogsFilterForm = ({ onChange, initialValues }) => {
  const formConfig = {
    from: {
      label: 'From',
      display: 'date',
      span: 4,
      showTime: true,
      allowClear: false,
    },
    to: {
      label: 'To',
      display: 'date',
      span: 4,
      showTime: true,
      allowClear: false,
    },
    sort: {
      label: 'Sort by duration',
      display: 'select',
      span: 4,
      allowClear: true,
      values: [{ Asc: 'asc' }, { Desc: 'desc' }],
    },
  };

  return <SimpleForm config={formConfig} onSubmit={onChange} initialValues={initialValues} autoSubmit />;
};

LogsFilterForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LogsFilterForm;
