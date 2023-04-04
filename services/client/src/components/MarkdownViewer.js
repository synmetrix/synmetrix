/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { marked } from 'marked';

import s from './MarkdownViewer.module.css';

const defaultContent = '# Documentation not found';

const MarkdownViewer = ({ data }) => (
  <div className={s.container}>
    <div dangerouslySetInnerHTML={{ __html: marked.parse(data || defaultContent) }} />
  </div>
);

MarkdownViewer.propTypes = {
  data: PropTypes.string.isRequired,
};

export default MarkdownViewer;
