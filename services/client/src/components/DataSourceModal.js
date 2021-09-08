import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Icon, Button, message,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import useCheckResponse from 'hooks/useCheckResponse';
import useSources from 'hooks/useSources';

import ModalView from 'components/ModalView';
import DataSourceForm from 'components/DataSourceForm';

const DataSourceModal = (props) => {
  const formRef = useRef(null);

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

    form.validateFields((err, values) => {
      if (err) {
        console.log('Error: ', values);
        return;
      }

      console.log('Received values of form: ', values);

      if (dataSource.id) {
        // call onSave if dataSource already present
        onSave(dataSource, values);
      } else {
        // or create new
        execCreateMutation({ object: values });
      }
    });
  };

  const modalFooter = (
    <Row type="flex">
      <Col span={12} style={{ textAlign: 'left' }}>
        {dataSource.id && (
          <>
            <Button onClick={() => execCheckMutation({ id: dataSource.id })} loading={checkMutation.fetching}>
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
