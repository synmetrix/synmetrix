import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Empty } from 'antd';

const emptyDesc = 'No Data';
const EmptyDefault = ({ description = emptyDesc }) => {
  const { t } = useTranslation();

  const desc = typeof description === 'string' ? t(description) : description;

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
  description: null,
};

export default EmptyDefault;
