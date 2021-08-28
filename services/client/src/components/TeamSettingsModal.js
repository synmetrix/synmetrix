import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Button,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import ModalView from 'components/ModalView';
import TeamSettingsForm from 'components/TeamSettingsForm';

const TeamSettingsModal = (props) => {
  const formRef = useRef(null);

  const {
    loading,
    onSave,
    currentTeam
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
          {t('Save')}
        </Button>
      </Col>
    </Row>
  );

  return (
    <ModalView
      {...pickKeys(['title', 'visible', 'loading', 'onCancel'], props)}
      footer={modalFooter}
      content={(
        <TeamSettingsForm
          initialValues={currentTeam}
          onSubmit={handleSave}
          wrappedComponentRef={formRef}
        />
      )}
    />
  );
};

TeamSettingsModal.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  currentTeam: PropTypes.object,
};

TeamSettingsModal.defaultProps = {
  onSave: () => { },
  onCancel: () => { },
  visible: false,
  loading: false,
  currentTeam: {}
};

export default TeamSettingsModal;
