import React from 'react';
import PropTypes from 'prop-types';

import { Form, Row } from 'antd';

import useSQLInterfaceConfig from '../hooks/useSQLInterfaceConfig';
import useFormItems from '../hooks/useFormItems';

const SQLInterfaceForm = React.forwardRef((props, ref) => {
  const {
    form, initialValues, onSubmit,
  } = props;

  const formConfig = useSQLInterfaceConfig({ initialValues });
  const [formItems] = useFormItems({ ref, form, initialValues, config: formConfig });

  return (
    <Row gutter={24}>
      <Form onSubmit={onSubmit}>
        {formItems}
      </Form>
    </Row>
  );
});

SQLInterfaceForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  style: PropTypes.object,
  initialValues: PropTypes.object,
};

SQLInterfaceForm.defaultProps = {
  edit: false,
  style: {},
  initialValues: {},
};

export default Form.create()(SQLInterfaceForm);