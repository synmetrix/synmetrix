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
  password: {
    label: 'Password',
    required: true,
    display: 'text',
    type: 'password'
  },
  memberName: {
    label: 'Name',
    required: true,
  },
  teamRole: {
    label: 'Member Role',
    required: true,
    display: 'select',
    default: 'viewer',
    values: [
      {
        Client: 'client'
      },
      {
        Viewer: 'viewer'
      },
      {
        Writer: 'writer'
      },
      {
        Owner: 'owner'
      },
    ],
  }
};

const TeamMemberForm = React.forwardRef((props, ref) => {
  let teamFormConfig = formConfig;
  const {
    form,
    onSubmit,
    isTeamExists,
    ...restProps
  } = props;

  if (!isTeamExists) {
    teamFormConfig = {
      ...formConfig,
      teamName: {
        label: 'Team Name',
        required: true,
        display: 'text',
      }
    };
  }

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
  isTeamExists: PropTypes.bool,
};

TeamMemberForm.defaultProps = {
  isTeamExists: false
};

export default Form.create()(TeamMemberForm);
