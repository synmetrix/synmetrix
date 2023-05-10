import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Icon, Button,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import useCheckResponse from 'hooks/useCheckResponse';
import useAlerts from 'hooks/useAlerts';
import useCurrentTeamState from 'hooks/useCurrentTeamState';

import ModalView from 'components/ModalView';
import AlertForm from 'components/AlertForm';

const AlertModal = (props) => {
  const formRef = useRef(null);
  const { currentTeamState } = useCurrentTeamState();

  const {
    mutations: {
      upsertMutation, execUpsertMutation,
      deleteMutation, execDeleteMutation,
    },
  } = useAlerts({ pauseQueryAll: true });

  const {
    loading,
    alert,
    initialValues,
    onChange, 
    onDelete: onDeleteAction,
  } = props;

  const { t } = useTranslation();

  const onCreate = (res) => {
    if (res) {
      props.onCancel();
    }
  };
  
  useCheckResponse(upsertMutation, onCreate, {
    successMessage: t('Alert saved')
  });

  const onDelete = (res) => {
    if (res) {
      onDeleteAction(res);
    }
  };

  useCheckResponse(deleteMutation, onDelete, {
    successMessage: t('Deleted'),
  });

  const handleSave = () => {
    const { form } = formRef.current;

    return form.validateFields().then(values => {
      const playgroundState = {
        page: 0,
        limit: values.limit,
        order: [{
          id: values.timeDimension,
          desc: true
        }],
        offset: 0,
        filters: [{
          values: values.since,
          operator: 'afterDate',
          dimension: values.timeDimension
        }],
        segments: [],
        timezone: 'UTC',
        measures: [values.measure],
        dimensions: [],
        timeDimensions: [{
          dimension: values.timeDimension,
          granularity: values.granularity
        }]
      };

      const newExplorationWithAlert = {
        playground_state: playgroundState,
        datasource_id: values.datasource_id,
        alerts: {
          on_conflict: {
            constraint: 'alerts_pkey',
            update_columns: ['name', 'trigger_config', 'delivery_config', 'exploration_id', 'schedule']
          },
          data: [{
            id: alert.id,
            name: values.name,
            schedule: values.schedule,
            trigger_config: values.trigger_config,
            delivery_type: values.delivery_type,
            delivery_config: values.delivery_config,
            team_id: currentTeamState?.id,
          }]
        }
      };

      return execUpsertMutation({ object: newExplorationWithAlert });
    }).catch(err => {
      // eslint-disable-next-line no-console
      console.error('Error: ', err);
    });
  };

  const modalFooter = (
    <Row type="flex">
      <Col span={12} style={{ textAlign: 'left' }}>
        {alert.id && (
          <Button type="danger" onClick={() => execDeleteMutation({ id: alert.id })} loading={deleteMutation.fetching}>
            <Icon type="disconnect" />
            {t('Remove')}
          </Button>
        )}
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {(initialValues.delivery_type || alert.id) && (
          <Button type="primary" onClick={handleSave} disabled={loading}>
            {alert.id && t('Update') || t('Save')}
          </Button>
        )}
      </Col>
    </Row>
  );

  return (
    <ModalView
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...pickKeys(['title', 'onCancel', 'visible', 'loading', 'breadcrumbs'], props)}
      footer={modalFooter}
      content={(
        <AlertForm
          style={{ paddingTop: 10 }}
          edit={!!initialValues.id}
          initialValues={{
            ...initialValues,
            ...alert,
          }}
          onSubmit={handleSave}
          onDeliveryTypeSelect={onChange}
          wrappedComponentRef={formRef}
        />
      )}
    />
  );
};

AlertModal.propTypes = {
  alert: PropTypes.object,
  breadcrumbs: PropTypes.array,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  initialValues: PropTypes.object,
};

AlertModal.defaultProps = {
  alert: {},
  breadcrumbs: [],
  onChange: () => { },
  onCancel: () => { },
  onSave: () => { },
  onDelete: () => { },
  visible: false,
  loading: false,
  initialValues: {},
};

export default AlertModal;
