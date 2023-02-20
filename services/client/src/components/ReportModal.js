import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  Row, Col, Icon, Button,
} from 'antd';

import pickKeys from 'utils/pickKeys';

import useCheckResponse from 'hooks/useCheckResponse';
import useReports from 'hooks/useReports';
import useCurrentTeamState from 'hooks/useCurrentTeamState';

import ModalView from 'components/ModalView';
import ReportForm from 'components/ReportForm';

const ReportModal = (props) => {
  const formRef = useRef(null);
  const { currentTeamState } = useCurrentTeamState();

  const {
    mutations: {
      upsertMutation, execUpsertMutation,
      deleteMutation, execDeleteMutation,
    },
  } = useReports({ pauseQueryAll: true });

  const {
    loading,
    report,
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
    successMessage: t('Report saved')
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
          id: values.granularity,
          desc: true
        }],
        offset: 0,
        filters: [{
          values: values.since,
          operator: 'afterDate',
          dimension: values.granularity
        }],
        segments: [],
        timezone: 'UTC',
        measures: [values.measure],
        dimensions: [values.granularity],
        timeDimensions: []
      };

      const newExplorationWithReport = {
        playground_state: playgroundState,
        datasource_id: values.datasource_id,
        reports: {
          on_conflict: {
            constraint: 'reports_pkey',
            update_columns: ['name', 'schedule', 'delivery_config', 'exploration_id']
          },
          data: [{
            id: report.id,
            name: values.name,
            schedule: values.schedule,
            delivery_type: values.delivery_type,
            delivery_config: values.delivery_config,
            team_id: currentTeamState?.id,
          }]
        }
      };

      return execUpsertMutation({ object: newExplorationWithReport });
    }).catch(err => {
      console.error('Error: ', err);
    });
  };

  const modalFooter = (
    <Row type="flex">
      <Col span={12} style={{ textAlign: 'left' }}>
        {report.id && (
          <Button type="danger" onClick={() => execDeleteMutation({ id: report.id })} loading={deleteMutation.fetching}>
            <Icon type="disconnect" />
            {t('Remove')}
          </Button>
        )}
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {(initialValues.delivery_type || report.id) && (
          <Button type="primary" onClick={handleSave} disabled={loading}>
            {report.id && t('Update') || t('Save')}
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
        <ReportForm
          style={{ paddingTop: 10 }}
          edit={!!initialValues.id}
          initialValues={{
            ...initialValues,
            ...report,
          }}
          onSubmit={handleSave}
          onDeliveryTypeSelect={onChange}
          wrappedComponentRef={formRef}
        />
      )}
    />
  );
};

ReportModal.propTypes = {
  report: PropTypes.object,
  breadcrumbs: PropTypes.array,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  initialValues: PropTypes.object,
};

ReportModal.defaultProps = {
  report: {},
  breadcrumbs: [],
  onChange: () => { },
  onCancel: () => { },
  onSave: () => { },
  onDelete: () => { },
  visible: false,
  loading: false,
  initialValues: {},
};

export default ReportModal;
