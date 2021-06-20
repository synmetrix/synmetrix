import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, PageHeader, Avatar } from 'antd';

import s from './PageInfo.module.css';

const PageInfo = ({ imgSrc, imgStyle, title, description, justify }) => (
  <Row className={s.root} type="flex" justify={justify} align="middle">
    {imgSrc && (
      <Col>
        <Avatar className={s.img} style={imgStyle} size={100} src={imgSrc} />
      </Col>
    )}
    <Col>
      <PageHeader title={title}>
        {description}
      </PageHeader>
    </Col>
  </Row>
);

PageInfo.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  imgStyle: PropTypes.object,
  description: PropTypes.element,
  justify: PropTypes.string,
};

PageInfo.defaultProps = {
  imgSrc: null,
  imgStyle: {},
  description: null,
  justify: 'start',
};

export default PageInfo;
