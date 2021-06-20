import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'antd';

const { Meta } = Card;

const FormTile = ({ onSelect, title, imgSrc }) => (
  <Col span={6}>
    <Card
      hoverable
      onClick={() => onSelect(title)}
      style={{ width: 170, height: 150, marginTop: 16 }}
      bodyStyle={{ padding: 10 }}
      cover={(
        <img
          alt=''
          style={{
            height: 80,
            width: 100,
            margin: '10px auto 0',
          }}
          src={imgSrc}
        />
      )}
    >
      <Meta title={title} style={{ textAlign: 'center', margin: 'auto' }} />
    </Card>
  </Col>
);

FormTile.propTypes = {
  onSelect: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default FormTile;
