import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import { useTranslation } from 'react-i18next';

import MonacoEditor from 'react-monaco-editor';

import s from './IdeTab.module.css';

const IdeTab = ({ onSave, onChange, value, ...restProps }) => {
  const [content, setContent] = useState(value);

  const editorRef = useRef(null);
  const { t } = useTranslation();

  const options = {
    minimap: {
      enabled: false,
    },
  };

  const { hash } = window.location;

  useEffect(
    () => {
      if (hash && editorRef.current) {
        const lineNumber = Number(hash.replace(/[^0-9]/g,'')) || 1;

        editorRef.current.setPosition({ lineNumber, column: 0 });
        editorRef.current.revealLine(lineNumber);
        editorRef.current.revealLineInCenterIfOutsideViewport(lineNumber);
        editorRef.current.focus();
      }
    },
    [hash]
  );

  const editorDidMount = editor => {
    editorRef.current = editor;
  };

  const onValueChange = val => {
    setContent(val)
    onChange(val);
  };

  const onValueSave = () => {
    onSave(content);
  };

  return (
    <React.Fragment>
      <div className={s.toolbar}>
        <Button onClick={onValueSave} type="primary">
          {t('Save')}
        </Button>
      </div>
      <MonacoEditor 
        language="javascript"
        theme="vs"
        value={content}
        options={options}
        onChange={onValueChange}
        editorDidMount={editorDidMount}
        {...restProps} 
      />
    </React.Fragment>
  );
};

IdeTab.propTypes = {
  onChange: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  value: PropTypes.string,
};

IdeTab.defaultProps = {
  value: '',
  onChange: () => {},
};

export default IdeTab;
