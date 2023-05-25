import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import MarkdownViewer from 'components/MarkdownViewer';
import Loader from 'components/Loader';

import useVersionDocs from '../hooks/useVersionDocs';

import downloadBlob from '../utils/downloadBlob';

import s from './DocsSection.module.css';

const DocsSection = ({ versionId, toolbar = false }) => {
  const { t } = useTranslation();

  const [docData] = useVersionDocs({ versionId });
  const markdown = docData?.data?.versions_by_pk?.markdown_doc;

  const downloadDoc = useCallback(() => {
    const blob = new Blob([markdown.replace(/&nbsp;/g, '')]);
    downloadBlob(blob, `${versionId}.md`);
  }, [markdown, versionId]);

  if (docData.loading) {
    return <Loader spinning />;
  }

  return (
    <>
      { toolbar && (
        <div className={s.toolbar}>
          <Button className={s.button} type="primary" onClick={downloadDoc}>
            {t('Download markdown')}
          </Button>
        </div>
      )}
      <div style={{ display: 'block', marginLeft: 10 }}>
        <MarkdownViewer markdown={markdown} />
      </div>
    </>
  );
};

DocsSection.propTypes = {
  versionId: PropTypes.number.isRequired,
  toolbar: PropTypes.bool
};

DocsSection.defaultProps = {
  toolbar: false
};

export default DocsSection;
