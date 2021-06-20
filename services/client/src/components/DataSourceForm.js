import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Form, Input } from 'antd';

import athena from 'assets/images/athena.svg';
import bigquery from 'assets/images/bigquery.svg';
import mssql from 'assets/images/mssql.svg';
import mysql from 'assets/images/mysql.svg';
import postgres from 'assets/images/postgres.svg';
import redshift from 'assets/images/redshift.svg';
import mongobi from 'assets/images/mongobi.svg';
import clickhouse from 'assets/images/clickhouse.svg';

import useFormItems from 'hooks/useFormItems';
import FormTiles from './FormTiles';

const defaultFormItems = {
  'dbParams.database': {
    label: 'Database Name',
    required: true,
    placeholder: 'ML_dbname',
  },
  'dbParams.host': {
    label: 'Host',
    required: true,
    placeholder: 'db1.ao.us-west-1.rds.amazonaws.com',
  },
  'dbParams.port': {
    label: 'Port',
    required: true,
    placeholder: '5432',
  },
  'dbParams.user': {
    label: 'User',
    required: true,
    placeholder: 'db_username',
  },
  'dbParams.password': {
    label: 'Password',
    required: true,
    placeholder: 'db_password',
  },
  'dbParams.ssl': {
    display: 'checkbox',
    label: 'Use SSL',
    value: 'yes',
  },
};

// TODO: test all connections https://github.com/cube-js/cube.js/blob/master/docs/Cube.js-Backend/Connecting-to-the-Database.md
const connectionFormItems = {
  default: defaultFormItems,
  athena: {
    'dbParams.awsKey': {
      label: 'Access Key',
      required: true,
      placeholder: 'AKIAJAFN53AS4NJWX1XJ',
    },
    'dbParams.awsSecret': {
      label: 'Secret Access Key',
      required: true,
      placeholder: '0RPVIfawtz2oAdt9gsz/UjTGsgO1ckwjSRvGH0pg',
    },
    'dbParams.awsRegion': {
      label: 'Region',
      required: true,
      placeholder: 'us-west-1',
    },
    'dbParams.awsS3OutputLocation': {
      label: 'S3 Output Location',
      required: true,
      placeholder: 's3://your-s3-bucket-for-query-results/',
    },
  },
  bigquery: {
    'dbParams.keyFile': {
      display: 'file',
      label: 'Keyfile',
      required: true,
      placeholder: 'Attach the file credentials, please',
      onChange: (updateState, form, fileJson) => {
        form.setFieldsValue({ 'dbParams.keyFile': fileJson, 'dbParams.projectId': fileJson.project_id });

        updateState({
          'hasFeedback.dbParams.keyFile': true,
          'hasFeedback.dbParams.projectId': true,
        });
      }
    },
    'dbParams.projectId': {
      label: 'Project Id',
      disabled: true
    }
  },
  mongobi: {
    ...defaultFormItems,
    'dbParams.ca': {
      label: 'SSL CA',
    },
    'dbParams.cert': {
      label: 'SSL CERT',
    },
    'dbParams.ciphers': {
      label: 'SSL CIPHERS',
    },
    'dbParams.passphrase': {
      label: 'SSL PASSPHRASE',
    },
  },
};

const dbTiles = [
  { title: 'POSTGRES', imgSrc: postgres },
  { title: 'MYSQL', imgSrc: mysql },
  { title: 'MONGOBI', imgSrc: mongobi },
  { title: 'ATHENA', imgSrc: athena },
  { title: 'BIGQUERY', imgSrc: bigquery },
  { title: 'REDSHIFT', imgSrc: redshift },
  { title: 'MSSQL', imgSrc: mssql },
  { title: 'CLICKHOUSE', imgSrc: clickhouse }
];

// example of use Antd Form with forwardRef
// https://codesandbox.io/s/wrappedcomponentref-upzhn
const DataSourceForm = React.forwardRef((props, ref) => {
  const {
    edit, form, initialValues, onSubmit,
    onDbTypeSelect,
    ...restProps
  } = props;

  const { dbType } = initialValues;

  const config = useMemo(
    () => connectionFormItems[dbType && dbType.toLowerCase()] || connectionFormItems.default,
    [dbType]
  );

  const [formItems] = useFormItems({ ref, form, initialValues, config });

  if (!dbType && !edit) {
    return (
      <FormTiles tiles={dbTiles} onSelect={onDbTypeSelect} {...restProps} />
    );
  }

  return (
    <Row gutter={24}>
      <Form onSubmit={onSubmit} {...restProps}>
        <Col span={12}>
          <Form.Item label="Name" required>
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
            {form.getFieldDecorator('dbType', {
              initialValue: initialValues.dbType,
              rules: [{ required: true }]
            })(<Input style={{ textTransform: 'lowercase' }} disabled />)}
          </Form.Item>
        </Col>

        {formItems}
      </Form>
    </Row>
  );
});

DataSourceForm.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDbTypeSelect: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  style: PropTypes.object,
};

DataSourceForm.defaultProps = {
  edit: false,
  style: {},
};

export default Form.create()(DataSourceForm);
