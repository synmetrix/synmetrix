import React from 'react';
import PropTypes from 'prop-types';

import { Row, Form } from 'antd';

import useFormItems from 'hooks/useFormItems';

const formConfig = {
  name: {
    label: 'Team Name',
    required: true,
  },
};

const TeamSettingsForm = React.forwardRef((props, ref) => {
  const {
    form,
    onSubmit,
    initialValues,
    ...restProps
  } = props;

  const [formItems] = useFormItems({ ref, form, initialValues, config: formConfig });

  return (
    <Row gutter={24}>
      <Form onSubmit={onSubmit} {...restProps}>
        {formItems}
      </Form>
    </Row>
  );
});

TeamSettingsForm.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form.create()(TeamSettingsForm);
