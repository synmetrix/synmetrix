import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import TooltipText from 'components/TooltipText';

const FormItemLabel = ({ label, desc, style }) => {
  const { t } = useTranslation();

  if (desc) {
    return (
      <TooltipText
        text={desc}
        style={style}
      >
        {t(label)}
      </TooltipText>
    );
  }

  return t(label);
};

FormItemLabel.propTypes = {
  label: PropTypes.string.isRequired,
  desc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  style: PropTypes.object,
};

FormItemLabel.defaultProps = {
  style: {},
};

export default FormItemLabel;
