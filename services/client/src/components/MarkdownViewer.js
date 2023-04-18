/* eslint-disable react/no-danger */
import React, { useMemo } from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';

import Loader from 'components/Loader';
import useVersionDocs from '../hooks/useVersionDocs';

import s from './MarkdownViewer.module.css';

const defaultContent = '# Documentation has not been generated yet';

const MarkdownViewer = ({ versionId }) => {
  const [docData] = useVersionDocs({ versionId });

  const doc = useMemo(() => {
    const markdown = docData?.data?.versions_by_pk?.markdown_doc || defaultContent;

    try {
      return marked.parse(markdown);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }, [docData]);

  if (docData.loading) {
    return <Loader spinning />;
  }

  return (
    <div className={s.container}>
      <div dangerouslySetInnerHTML={{ __html: doc }} />
    </div>
  );
};

MarkdownViewer.propTypes = {
  versionId: PropTypes.string.isRequired
};

export default MarkdownViewer;
