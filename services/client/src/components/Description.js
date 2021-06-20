import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'antd';

import s from './Description.module.css';

const Description = ({ term, children, span = 12 }) => (
  <Col span={span}>
    <div className={s.description}>
      <div className={s.term}>{term}</div>
      <div className={s.detail}>{children}</div>
    </div>
  </Col>
);

Description.propTypes = {
  span: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  term: PropTypes.string.isRequired,
};

export default Description;
