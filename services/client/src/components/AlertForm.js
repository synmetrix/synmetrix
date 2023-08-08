/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Row, Col, Form, Input } from 'antd';

import webhook from 'assets/images/webhook.svg';
import slack from 'assets/images/slack.svg';
import email from 'assets/images/email.svg';

import useFormItems from 'hooks/useFormItems';
import useAlertsConfig from 'hooks/useAlertsConfig';

import FormTiles from './FormTiles';

const DEFAULT_SINCE_VALUE = 'Yesterday';
const DEFAULT_LIMIT_VALUE = 20;

const deliveryTiles = [
  { title: 'Webhook', imgSrc: webhook },
  { title: 'Slack', imgSrc: slack },
  { title: 'Email', imgSrc: email }
];

const AlertForm = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  const {
    edit, form, initialValues, onSubmit,
    onDeliveryTypeSelect,
    ...restProps
  } = props;

  const { exploration, ...alertInitialValues } = initialValues;
  const { delivery_type: deliveryType } = alertInitialValues;
  const { playground_state: playgroundState, datasource_id: datasourceId } = exploration || {};

  const preparedInitialValues = useMemo(() => ({
    ...alertInitialValues,
    datasource_id: datasourceId,
    cube: playgroundState?.measures?.[0]?.split('.')?.[0],
    measure: playgroundState?.measures?.[0],
    timeDimension: playgroundState?.timeDimensions?.[0]?.dimension,
    granularity: playgroundState?.timeDimensions?.[0]?.granularity,
    since: playgroundState?.filters?.[0]?.values ?? DEFAULT_SINCE_VALUE,
    limit: playgroundState?.limit ?? DEFAULT_LIMIT_VALUE,
  }), [datasourceId, playgroundState, alertInitialValues]);

  const config = useAlertsConfig({ form, initialValues: preparedInitialValues, entity: 'alert' });

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
          <Form.Item label={t('Alert Name')} required>
            {form.getFieldDecorator('name', {
              initialValue: initialValues.name,
              rules: [
                { required: true, message: t('Name is required') }
              ]
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Type')} required>
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

AlertForm.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDeliveryTypeSelect: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  style: PropTypes.object,
};

AlertForm.defaultProps = {
  edit: false,
  style: {},
};

export default Form.create()(AlertForm);
