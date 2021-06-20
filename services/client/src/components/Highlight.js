import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

import transpose from 'utils/transpose';

import s from './Highlight.module.css';

const { Text } = Typography;

const buildHightlight = (value, indices) => {
  let res = [];

  const transposedIndices = transpose(indices);

  const startAtSet = new Set(transposedIndices[0]);
  const endAtSet = new Set(transposedIndices[1]);

  let breakAt = 0;

  for (let index in value) {
    index = Number(index); // I have no idea why index is a String

    const nextCharIndex = index + 1;

    if (startAtSet.has(index)) {
      res = [
        ...res,
        value.substring(breakAt, index),
      ];

      breakAt = index;
    }

    if (endAtSet.has(index)) {
      res = [
        ...res,
        <span key={index} className={s.highlight}>{value.substring(breakAt, nextCharIndex)}</span>,
      ];

      breakAt = nextCharIndex;
    }
  }

  res = [
    ...res,
    value.substring(breakAt),
  ];

  return res;
};

const Highlight = ({ index, text, indices, ...restProps }) => {
  if (!indices.length) {
    return null;
  }

  return (
    <div className={s.row} {...restProps}>
      <Text type="secondary">line {index}:&nbsp;</Text>
      <Text code>{buildHightlight(text, indices)}</Text>
    </div>
  );
};

Highlight.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  indices: PropTypes.array.isRequired,
};

export default Highlight;
