import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import FormTile from './FormTile';

const FormTiles = ({ onSelect, tiles, ...restProps }) => (
  <Row {...restProps}>
    {tiles.map(tile => (
      <FormTile key={tile.title} onSelect={onSelect} {...tile} />
    ))}
  </Row>
);

FormTiles.propTypes = {
  style: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  tiles: PropTypes.arrayOf(PropTypes.object)
};

FormTiles.defaultProps = {
  style: {},
  tiles: []
};

export default FormTiles;
