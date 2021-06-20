import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Button,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import ModalView from 'components/ModalView';
import TeamMemberForm from 'components/TeamMemberForm';

const InviteTeamMemberModal = (props) => {
  const formRef = useRef(null);

  const {
    loading,
    onSave,
    isTeamExists
  } = props;

  const { t } = useTranslation();

  const handleSave = () => {
    const { form } = formRef.current;

    form.validateFields((err, values) => {
      if (err) {
        console.log('Error: ', values);
        return;
      }

      onSave(values);
    });
  };

  const modalFooter = (
    <Row>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={handleSave} disabled={loading}>
          {t('Invite')}
        </Button>
      </Col>
    </Row>
  );

  return (
    <ModalView
      {...pickKeys(['title', 'visible', 'loading', 'onCancel', 'breadcrumbs'], props)}
      footer={modalFooter}
      content={(
        <TeamMemberForm
          initialValues={{}}
          onSubmit={handleSave}
          wrappedComponentRef={formRef}
          isTeamExists={isTeamExists}
        />
      )}
    />
  );
};

InviteTeamMemberModal.propTypes = {
  breadcrumbs: PropTypes.array,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  isTeamExists: PropTypes.bool,
};

InviteTeamMemberModal.defaultProps = {
  breadcrumbs: [],
  onSave: () => { },
  onCancel: () => { },
  visible: false,
  loading: false,
  isTeamExists: false
};

export default InviteTeamMemberModal;
