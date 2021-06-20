import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import s from './TextWithAction.module.css';

const TextWithAction = ({ item, actionContent, ...restProps }) => (
  <div className={s.root} {...restProps}>
    <span className={s.name}>
      <Icon type="file-text" /> {item.name}
    </span>

    {actionContent}
  </div>
);

TextWithAction.propTypes = {
  item: PropTypes.object.isRequired,
  actionContent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
};

TextWithAction.defaultProps = {
  actionContent: null,
};

export default TextWithAction;
