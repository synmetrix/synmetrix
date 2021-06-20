import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import useFormItems from 'hooks/useFormItems';

import s from './DataSourceFileForm.module.css';

const DataSourceFileForm = React.forwardRef((props, ref) => {
  const {
    editId, onSave, form, ...restProps
  } = props;

  const { t } = useTranslation();

  const config = {
    name: !editId && {
      label: t('Data Source Name'),
      required: true,
      placeholder: `${t('Data Source Name')}...`,
      span: 6,
    },
    delimiter: {
      label: t('Columns Delimiter'),
      required: true,
      placeholder: `${t('Default')} "auto"`,
      default: 'auto',
      span: 6,
    },
    writePolicy: {
      label: t('Write Policy'),
      type: 'string',
      display: 'select',
      allowClear: false,
      span: 12,
      placeholder: t('Select policy'),
      default: 'rolling_update',
      values: [
        { 'Rolling Update': 'rolling_update' },
        { Append: 'append' },
        { Truncate: 'truncate' },
      ],
    },
  };

  const [generalFormItems] = useFormItems({ ref, form, initialValues: { name: '' }, config, itemClassName: s.item });

  return (
    <Form onSubmit={onSave} {...restProps}>
      {generalFormItems}
    </Form>
  );
});

DataSourceFileForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  editId: PropTypes.string,
};

DataSourceFileForm.defaultProps = {
  editId: null,
};

export default Form.create()(DataSourceFileForm);
