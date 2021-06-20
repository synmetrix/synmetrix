import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Result } from 'antd';

const ErrorFound = ({ status }) => {
  const { t } = useTranslation();

  if (status === 500) {
    return (
      <Result
        status="500"
        title="500"
        subTitle={t('Sorry, something went wrong')}
      />
    );
  }

  if (status === 403) {
    return (
      <Result
        status="403"
        title="403"
        subTitle={t('You have no access')}
      />
    );
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('Sorry, the page you visited does not exist.')}
    />
  );
};

ErrorFound.propTypes = {
  status: PropTypes.number.isRequired,
};

ErrorFound.defaultProps = {};

export default ErrorFound;
