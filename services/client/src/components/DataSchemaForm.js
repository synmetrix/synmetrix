import React, { useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';

// example of use Antd Form with forwardRef 
// https://codesandbox.io/s/wrappedcomponentref-upzhn
const DataSchemaForm = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  const { 
    form, initialValues, onSubmit,
    editId,
  } = props;

  useImperativeHandle(ref, () => ({
    form
  }));

  const onFormSubmit = () => {
    onSubmit(editId);
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Item label={t('Filename')} required>
        {form.getFieldDecorator('name', {
          initialValue: initialValues.name,
          rules: [{ required: true }]
        })(<Input />)}
      </Form.Item>
      <div>
        <Button type="primary" onClick={onFormSubmit}>
          {t('Save')}
        </Button>
      </div>
    </Form>
  );
});

DataSchemaForm.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  editId: PropTypes.string,
};

DataSchemaForm.defaultProps = {
  onSubmit: () => {},
  initialValues: {},
  editId: null,
};

export default Form.create()(DataSchemaForm);
