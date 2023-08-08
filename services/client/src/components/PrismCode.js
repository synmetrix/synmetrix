import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Prism from 'prismjs';
import { Typography } from 'antd';

import EmptyDefault from 'components/EmptyDefault';

import s from './PrismCode.module.css';

Prism.highlightAll();

const { Text } = Typography;

const PrismCode = ({ style, code, lang }) => {
  const [htmlContent, setContent] = useState('');

  useEffect(
    () => {
      const html = Prism.highlight(code, Prism.languages[lang], lang);
      setContent(html);
    },
    [code, lang]
  );

  if (!htmlContent) {
    return <EmptyDefault />;
  }

  return (
    <div className={s.container}>
      <pre style={style}>
        <Text code copyable={{ text: code }} style={{ background: 'none', border: 'none' }}>
          <div style={{ display: 'inline' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Text>
      </pre>
    </div>
  );
};

PrismCode.propTypes = {
  style: PropTypes.object,
  code: PropTypes.string,
  lang: PropTypes.string
};

PrismCode.defaultProps = {
  style: {},
  code: '',
  lang: 'sql'
};

export default PrismCode;
