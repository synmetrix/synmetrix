import React from 'react';
import PropTypes from 'prop-types';

import { Row, Form } from 'antd';

import useFormItems from 'hooks/useFormItems';

const formConfig = {
  email: {
    label: 'Email',
    required: true,
    rules: [{
      type: 'email',
      message: 'Email is not valid',
    }],
  },
  role: {
    label: 'Role',
    required: true,
    display: 'select',
    allowClear: false,
    default: 'member',
    values: [
      { Member: 'member' },
      { Admin: 'admin' },
    ],
  },
};

const TeamMemberForm = React.forwardRef((props, ref) => {
  const teamFormConfig = formConfig;

  const {
    form,
    onSubmit,
    ...restProps
  } = props;

  const [formItems] = useFormItems({ ref, form, config: teamFormConfig });

  return (
    <Row gutter={24}>
      <Form onSubmit={onSubmit} {...restProps}>
        {formItems}
      </Form>
    </Row>
  );
});

TeamMemberForm.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(TeamMemberForm);
