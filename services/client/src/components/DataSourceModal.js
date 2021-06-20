import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { get } from 'unchanged';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Icon, Button, message,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import useDataSources from 'hooks/useDataSources';
import useGlobalStore from 'hooks/useGlobalStore';

import ModalView from 'components/ModalView';
import DataSourceForm from 'components/DataSourceForm';

const DataSourceModal = (props) => {
  const { setLastUsedDataSourceId } = useGlobalStore();
  const formRef = useRef(null);

  const {
    mutations: {
      createMutation, mExecuteNewMutation,
      testMutation, mExecuteTestMutation,
      deleteMutation, mExecuteDeleteMutation,
    },
  } = useDataSources({ pauseQueryAll: true });

  const {
    loading,
    dataSource, initialValues,
    onSave, onChange, onDelete
  } = props;

  const { t } = useTranslation();

  const onCreateEffect = useCallback(
    () => {
      if (createMutation.data) {
        onSave(get('createDatasource.datasourceEdge.node', createMutation.data));
      }
    },
    [createMutation.data, onSave]
  );

  const onTestEffect = useCallback(
    () => {
      if (testMutation.data) {
        const testMessage = get('testConnection.message', testMutation.data);

        if (testMessage === 'OK') {
          message.success('Connection is OK');
        } else {
          message.error(testMessage);
        }
      }

      if (testMutation.error) {
        message.error(testMutation.error.toString());
      }
    },
    [testMutation.data, testMutation.error]
  );

  const onDeleteEffect = useCallback(
    () => {
      if (deleteMutation.error) {
        message.error(deleteMutation.error.message);
      } else if (deleteMutation.data) {
        message.success('Deleted');
        setLastUsedDataSourceId('');
        onDelete(deleteMutation.data);
      }
    },
    [deleteMutation.data, deleteMutation.error, onDelete, setLastUsedDataSourceId]
  );

  useEffect(
    onCreateEffect,
    [createMutation.data]
  );

  useEffect(
    onTestEffect,
    [testMutation.data]
  );

  useEffect(
    onDeleteEffect,
    [deleteMutation.data]
  );

  // always call executeTestMutation if dataSource present
  useEffect(
    () => {
      if (dataSource.rowId) {
        mExecuteTestMutation(dataSource.rowId);
      }
    },
    [dataSource.rowId, mExecuteTestMutation]
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
        mExecuteNewMutation(values);
      }
    });
  };

  const modalFooter = (
    <Row type="flex">
      <Col span={12} style={{ textAlign: 'left' }}>
        {dataSource.id && (
          <>
            <Button onClick={() => mExecuteTestMutation(dataSource.rowId)} loading={testMutation.fetching}>
              <Icon type="api" />
              {t('Test Connection')}
            </Button>
            <Button type="danger" onClick={() => mExecuteDeleteMutation(dataSource.id)} loading={deleteMutation.fetching}>
              <Icon type="disconnect" />
              {t('Remove')}
            </Button>
          </>
        )}
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {(initialValues.dbType || dataSource.id) && (
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
          edit={!!initialValues.rowId}
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
