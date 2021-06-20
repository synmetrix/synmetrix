import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import ErrorMessage from 'components/ErrorMessage';
import SimpleForm from 'components/SimpleForm';

const GraphQLForm = (props) => {
  const { 
    queryText,
    queryState,
    variables,
    actionTitle,
    onExec,
  } = props;

  const { t } = useTranslation();

  const formConfig = {
    queryBody: {
      label: t('Query Body'),
      type: 'string',
      display: 'text',
      default: (queryText || '').trim(),
      placeholder: t('Raw Query'),
      rows: 5,
      span: 24,
    },
    queryVariables: {
      label: t('Query Variables'),
      type: 'string',
      display: 'text',
      default: JSON.stringify(variables),
      placeholder: t('Query Variables'),
      span: 24,
    },
  };

  const handleSubmit = (values) => {
    console.log('Receiving form values: ', values);

    onExec(values);
  };

  return (
    <>
      <div>
        <SimpleForm 
          size="small"
          config={formConfig}
          onSubmit={handleSubmit}
          submitText={actionTitle}
          loading={queryState.fetching}
        />
        {queryState.error && (
          <ErrorMessage style={{ marginTop: 10 }} text={queryState.error.toString()} />
        )}
        {!queryState.error && queryState.data && (
          <ErrorMessage type="info" style={{ marginTop: 10 }} text={JSON.stringify(queryState.data)} />
        )}
      </div>
    </>
  );
};

GraphQLForm.propTypes = {
  queryText: PropTypes.string,
  queryState: PropTypes.object,
  variables: PropTypes.object,
  onExec: PropTypes.func,
  actionTitle: PropTypes.string,
};

GraphQLForm.defaultProps = {
  queryText: 'graphql_query',
  queryState: {
    error: null,
    data: null,
  },
  variables: {},
  onExec: () => {},
  actionTitle: 'Execute',
};

export default GraphQLForm;
