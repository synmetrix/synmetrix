/* eslint-disable no-param-reassign */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Form, Input } from 'antd';

import webhook from 'assets/images/webhook.svg';
import slack from 'assets/images/slack.svg';
import email from 'assets/images/email.svg';

import useFormItems from 'hooks/useFormItems';
import useReportsConfig from 'hooks/useReportsConfig';

import FormTiles from './FormTiles';

const DEFAULT_SINCE_VALUE = 'Yesterday';
const DEFAULT_LIMIT_VALUE = 20;

const deliveryTiles = [
  { title: 'Webhook', imgSrc: webhook },
  { title: 'Slack', imgSrc: slack },
  { title: 'Email', imgSrc: email }
];

const ReportForm = React.forwardRef((props, ref) => {
  const {
    edit, form, initialValues, onSubmit,
    onDeliveryTypeSelect,
    ...restProps
  } = props;

  const { exploration, ...reportInitialValues } = initialValues;
  const { delivery_type: deliveryType } = reportInitialValues;
  const { playground_state: playgroundState, datasource_id: datasourceId } = exploration || {};

  const preparedInitialValues = useMemo(() => ({
    ...reportInitialValues,
    datasource_id: datasourceId,
    cube: playgroundState?.measures?.[0]?.split('.')?.[0],
    measure: playgroundState?.measures?.[0],
    granularity: playgroundState?.dimensions?.[0],
    since: playgroundState?.filters?.[0]?.values ?? DEFAULT_SINCE_VALUE,
    limit: playgroundState?.limit ?? DEFAULT_LIMIT_VALUE,
  }), [datasourceId, playgroundState, reportInitialValues]);

  const config = useReportsConfig({ form, initialValues: preparedInitialValues });

  const [formItems] = useFormItems({ ref, form, initialValues: preparedInitialValues, config });

  if (!deliveryType && !edit) {
    return (
      <FormTiles tiles={deliveryTiles} onSelect={onDeliveryTypeSelect} {...restProps} />
    );
  }

  return (
    <Row gutter={24}>
      <Form onSubmit={onSubmit} {...restProps}>
        <Col span={12}>
          <Form.Item label="Report Name" required>
            {form.getFieldDecorator('name', {
              initialValue: initialValues.name,
              rules: [
                { required: true, message: 'Name is required' }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Type" required>
            {form.getFieldDecorator('delivery_type', {
              initialValue: initialValues.delivery_type,
              rules: [{ required: true }]
            })(<Input style={{ textTransform: 'lowercase' }} disabled />)}
          </Form.Item>
        </Col>

        {formItems}
      </Form>
    </Row>
  );
});

ReportForm.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDeliveryTypeSelect: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  style: PropTypes.object,
};

ReportForm.defaultProps = {
  edit: false,
  style: {},
};

export default Form.create()(ReportForm);