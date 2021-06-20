import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

import s from './EditableField.module.css';

const { Paragraph } = Typography;

// TODO: add validation of the entered value on serverside
const EditableField = ({ currentValue, renameFunc, id, style }) => {
  const onChange = (newValue) => {
    renameFunc(id, { name: newValue });
  };

  const onClick = e => {
    if (e.target.className && typeof(e.target.className) === 'string' && e.target.className.indexOf('ant-typography') > -1) {
      return;
    }

    e.stopPropagation();
  };

  return (
    <span onClick={onClick}>
      <Paragraph
        className={s.paragraph}
        style={style}
        editable={{ onChange }}
        ellipsis
      >
        {currentValue}
      </Paragraph>
    </span>
  );
};

EditableField.propTypes = {
  currentValue: PropTypes.string.isRequired,
  renameFunc: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
};

EditableField.defaultProps = {
  style: {},
};

export default EditableField;
