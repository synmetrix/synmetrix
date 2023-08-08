import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Button, Icon, Alert } from 'antd';

import MonacoEditor from 'react-monaco-editor';
import { ResizableBox } from 'react-resizable';
import TableView from 'components/TableView';
import PopoverButton from 'components/PopoverButton';
import InputNumber from 'components/InputNumber';
import Loader from 'components/Loader';

import { queryState } from 'hooks/useAnalyticsQuery';

import s from './SqlRunner.module.css';

const SqlRunner = ({ data, loading, error, onRun, width, height, editorHeight, ...restProps }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('SELECT id FROM users');

  const { limit: initialLimit } = queryState;
  const [limit, setLimit] = useState(initialLimit);

  const monacoRef = useRef(null);
  const [monacoHeight, setMonacoHeight] = useState(editorHeight);

  return (
    <>
      <div className={s.toolbar}>
        <Button onClick={() => onRun(value, parseInt(limit, 10))} type="primary" disabled={value === '' || loading}>
          {t('Run')}
        </Button>

        <div style={{ display: 'block', marginLeft: 10 }}>
          <PopoverButton
            iconType="setting"
            style={{ borderColor: 'transparent', boxShadow: 'none', color: 'rgba(0, 0, 0, 0.25)' }}
            placement="bottom"
            content={(
              <div>
                {t('Rows Limit')}: <br />
                <InputNumber value={limit} onChange={setLimit} />
              </div>
            )}
            trigger="click"
          />
        </div>

      </div>
      {Object.keys(error).length && (
        <div>
          <Alert style={{ borderRadius: 0 }} type="error" message={error.toString()} closable />
        </div>
      ) || null}
      <div style={{ marginBottom: '22px' }}>
        <ResizableBox
          width={width}
          height={100}
          axis='y'
          resizeHandles={['s']}
          handle={<div className={s.resizeHandler}><Icon type="vertical-align-top" /></div>}
          minConstraints={[width, 100]}
          maxConstraints={[width, height - 100]}
          onResize={(_w, editor) => {
            setMonacoHeight(editor.size.height);
            monacoRef.current.editor.layout();
          }}
        >
          <Loader spinning={loading}>
            <MonacoEditor
              language="javascript"
              theme="vs"
              ref={monacoRef}
              value={value}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              onChange={v => setValue(v)}
              {...restProps}
              width={width}
              height={monacoHeight}
            />
          </Loader>
        </ResizableBox>
      </div>
      <TableView
        width={width}
        height={height - monacoHeight - 22}
        data={data}
      />
    </>
  );
};

SqlRunner.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  editorHeight: PropTypes.number,
  error: PropTypes.object,
  onRun: PropTypes.func,
  loading: PropTypes.bool,
};

SqlRunner.defaultProps = {
  editorHeight: 100,
  error: {},
  onRun: () => { },
  loading: false,
};

export default SqlRunner;
