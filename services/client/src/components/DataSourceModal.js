import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Icon, Button, message,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import useCheckResponse from 'hooks/useCheckResponse';
import useSources from 'hooks/useSources';
import useCurrentUserState from 'hooks/useCurrentUserState';
import useCurrentTeamState from 'hooks/useCurrentTeamState';

import ModalView from 'components/ModalView';
import DataSourceForm from 'components/DataSourceForm';

const DataSourceModal = (props) => {
  const formRef = useRef(null);
  const { currentTeamState } = useCurrentTeamState();
  const { currentUserState } = useCurrentUserState();
  const currentUser = currentUserState?.users_by_pk;

  const {
    mutations: {
      createMutation, execCreateMutation,
      checkMutation, execCheckMutation,
      deleteMutation, execDeleteMutation,
    },
  } = useSources({ pauseQueryAll: true });

  const {
    loading,
    dataSource,
    initialValues,
    onSave,
    onChange, 
    onDelete: onDeleteAction,
  } = props;

  const { t } = useTranslation();

  const onCreate = (res) => {
    if (res) {
      props.onCancel();
    }
  };
  
  useCheckResponse(createMutation, onCreate, {
    successMessage: t('Source created')
  });

  const onCheck = (res) => {
    if (res?.check_connection?.code === 'ok') {
      message.success(res?.check_connection?.message);
    } else if (res?.check_connection?.message) {
      message.error(res?.check_connection?.message);
    }
  };

  useCheckResponse(checkMutation, onCheck, {
    successMessage: null,
  });

  const onDelete = (res) => {
    if (res) {
      onDeleteAction(res);
    }
  };

  useCheckResponse(deleteMutation, onDelete, {
    successMessage: t('Deleted'),
  });

  // always call check if dataSource present
  useEffect(
    () => {
      if (dataSource.id) {
        execCheckMutation({ id: dataSource.id });
      }
    },
    [dataSource.id, execCheckMutation]
  );

  const handleSave = () => {
    const { form } = formRef.current;

    return form.validateFields().then(values => {
      console.log('Received values of form: ', values);

      if (dataSource.id) {
        // call onSave if dataSource already present
        return onSave(dataSource, values);
      } 

      // or create new
      const newSource = {
        ...values,
        branches: {
          data: {
            name: 'main',
            status: 'active',
            user_id: currentUser.id,
          }
        }
      };

      if (currentTeamState.id) {
        newSource.team_id = currentTeamState.id;
      }

      return execCreateMutation({ object: newSource });
    }).catch(err => {
      console.error('Error: ', err);
    });
  };

  const onCheckConnection = async () => {
    await handleSave();
    message.info(t('Checking the connection...'));
    execCheckMutation({ id: dataSource.id });
  };

  const modalFooter = (
    <Row type="flex">
      <Col span={12} style={{ textAlign: 'left' }}>
        {dataSource.id && (
          <>
            <Button onClick={onCheckConnection} loading={checkMutation.fetching}>
              <Icon type="api" />
              {t('Test Connection')}
            </Button>
            <Button type="danger" onClick={() => execDeleteMutation({ id: dataSource.id })} loading={deleteMutation.fetching}>
              <Icon type="disconnect" />
              {t('Remove')}
            </Button>
          </>
        )}
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {(initialValues.db_type || dataSource.id) && (
          <Button type="primary" onClick={handleSave} disabled={loading}>
            {dataSource.id && t('Save') || t('Connect Now')}
          </Button>
        )}
      </Col>
    </Row>
  );

  return (
    <ModalView
      {...pickKeys(['title', 'onCancel', 'visible', 'loading', 'breadcrumbs'], props)}
      footer={modalFooter}
      loading={checkMutation.fetching}
      content={(
        <DataSourceForm
          style={{ paddingTop: 10 }}
          edit={!!initialValues.id}
          initialValues={{
            ...initialValues,
            ...dataSource,
          }}
          onSubmit={handleSave}
          onDbTypeSelect={onChange}
          wrappedComponentRef={formRef}
        />
      )}
    />
  );
};

DataSourceModal.propTypes = {
  dataSource: PropTypes.object,
  breadcrumbs: PropTypes.array,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  initialValues: PropTypes.object,
};

DataSourceModal.defaultProps = {
  dataSource: {},
  breadcrumbs: [],
  onChange: () => { },
  onCancel: () => { },
  onSave: () => { },
  onDelete: () => { },
  visible: false,
  loading: false,
  initialValues: {},
};

export default DataSourceModal;
