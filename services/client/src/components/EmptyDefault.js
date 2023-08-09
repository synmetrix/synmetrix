import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Empty } from 'antd';

const EmptyDefault = ({ description }) => {
  const { t } = useTranslation();

  const desc = typeof(description) === 'string' ? t(description) : description;

  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={desc} />
  );
};

EmptyDefault.propTypes = {
  description: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.string,
  ]),
};

EmptyDefault.defaultProps = {
  description: 'No Data',
};

export default EmptyDefault;
