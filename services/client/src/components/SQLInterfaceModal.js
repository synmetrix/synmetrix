import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Icon, Button, message,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import useCheckResponse from 'hooks/useCheckResponse';
import useSQLCredentials from 'hooks/useSQLCredentials';

import ModalView from 'components/ModalView';
import SQLInterfaceForm from 'components/SQLInterfaceForm';

const SQLInterfaceModal = (props) => {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const handleSave = () => {};
  // const { currentTeamState } = useCurrentTeamState();

  // const {
  //   mutations: {
  //     createMutation, execCreateMutation,
  //     checkMutation, execCheckMutation,
  //     deleteMutation, execDeleteMutation,
  //   },
  // } = useSQLInterfaces({ pauseQueryAll: true });

  const {
    loading,
    dataSource,
    initialValues,
    onSave,
    onChange, 
    onDelete: onDeleteAction,
  } = props;


  // const onCreate = (res) => {
  //   if (res) {
  //     props.onCancel();
  //   }
  // };
  
  // useCheckResponse(createMutation, onCreate, {
  //   successMessage: t('Source created')
  // });

  // const onCheck = (res) => {
  //   if (res?.check_connection?.code === 'ok') {
  //     message.success(res?.check_connection?.message);
  //   } else if (res?.check_connection?.message) {
  //     message.error(res?.check_connection?.message);
  //   }
  // };

  const modalFooter = (
    <Row type="flex">
      <Col span={24} style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={handleSave} disabled={loading}>
          {t('Create new')}
        </Button>
      </Col>
    </Row>
  );

  return (
    <ModalView
      {...pickKeys(['title', 'onCancel', 'visible', 'loading', 'breadcrumbs'], props)}
      footer={modalFooter}
      loading={false}
      content={(
        <SQLInterfaceForm
          style={{ paddingTop: 10 }}
          edit={!!initialValues.id}
          initialValues={{
            ...initialValues,
          }}
          onSubmit={handleSave}
          wrappedComponentRef={formRef}
        />
      )}
    />
  );
};

SQLInterfaceModal.propTypes = {
  breadcrumbs: PropTypes.array,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  initialValues: PropTypes.object,
};

SQLInterfaceModal.defaultProps = {
  breadcrumbs: [],
  onChange: () => { },
  onCancel: () => { },
  onSave: () => { },
  onDelete: () => { },
  visible: false,
  loading: false,
  initialValues: {},
};

export default SQLInterfaceModal;
