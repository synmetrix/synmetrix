import React, { useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Alert, Form, Button, Checkbox, Collapse } from 'antd';

import { normalizeExt } from 'utils/validation';

const { Panel } = Collapse;

const GenDataSchemasForm = React.forwardRef((props, ref) => {
  const { t } = useTranslation();

  const { 
    form, onSubmit, schemas,
  } = props;

  useImperativeHandle(ref, () => ({
    form
  }));

  // need this because form inputs propagate events futher 
  const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onFormSubmit = (e) => {
    stopPropagation(e);

    form.validateFields((err, values) => {
      if (err) {
        console.log('Error: ', values);
        return;
      }

      console.log('Received values of form: ', values);

      form.resetFields();
      onSubmit(values);
    });
  };

  const infoText = t('Simple generate new data schema files for your tables');
  const schemaKeys = Object.keys(schemas);

  return (
    <Form onSubmit={onFormSubmit}>
      <Alert message={infoText} type="info" style={{ marginBottom: 15 }} />

      <Collapse defaultActiveKey={[schemaKeys[0]]}>
        {Object.entries(schemas).map(([schemaName, schemaTables]) => (
          <Panel header={schemaName} key={schemaName}>
            {Object.entries(schemaTables).map(([tableName, tableColumns]) => (
              <div style={{ background: '#f0f2f5' }} key={tableName}>
                <Form.Item key={tableName} style={{ padding: 5, margin: 5 }}>
                  {form.getFieldDecorator(`${schemaName}/${tableName}`, {
                    initialValue: false,
                    valuePropName: 'checked',
                  })(
                    <Checkbox>
                      <b style={{ fontWeight: 500 }}>{tableName} -> {normalizeExt(tableName, '.js')}</b>
                      &nbsp;({tableColumns.length}) columns
                    </Checkbox>)}
                </Form.Item>
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>

      <div style={{ paddingTop: 15 }}>
        <Button type="primary" onClick={onFormSubmit}>
          {t('Generate')}
        </Button>
      </div>
    </Form>
  );
});

GenDataSchemasForm.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  schemas: PropTypes.object,
};

GenDataSchemasForm.defaultProps = {
  onSubmit: () => {},
  initialValues: {},
  schemas: {},
};

export default Form.create()(GenDataSchemasForm);
