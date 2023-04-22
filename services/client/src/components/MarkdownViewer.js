/* eslint-disable react/no-danger */
import React, { useMemo } from 'react';
import { marked } from 'marked';
import PropTypes from 'prop-types';

import s from './MarkdownViewer.module.css';

const defaultContent = '# Documentation has not been generated yet';

const MarkdownViewer = ({ markdown = defaultContent }) => {
  const docs = useMemo(() => {
    try {
      return marked.parse(markdown);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }, [markdown]);

  return (
    <div className={s.container}>
      <div dangerouslySetInnerHTML={{ __html: docs }} />
    </div>
  );
};

MarkdownViewer.propTypes = {
  markdown: PropTypes.string.isRequired
};

export default MarkdownViewer;
