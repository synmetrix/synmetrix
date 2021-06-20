import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Tag, Icon } from 'antd';

const ClosableTag = ({ id, tagName, curTags, onTagsChange }) => {
  const [closing, setClosing] = useState(false);

  const onClose = useCallback((e, tag) => {
    e.preventDefault();
    const tags = curTags.filter(t => t !== tag);

    setClosing(true);
    onTagsChange(id, { tags });
  }, [curTags, id, onTagsChange]);

  useEffect(() => {
    if (curTags) {
      setClosing(false);
    }
  }, [curTags]);

  return (
    <Tag
      key={tagName}
      closable={!closing}
      onClose={(e) => onClose(e, tagName)}
    >
      {tagName}
      {closing && <Icon style={{ marginLeft: 4 }} type="sync" spin />}
    </Tag>
  );
};

ClosableTag.propTypes = {
  id: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  curTags: PropTypes.array.isRequired,
  onTagsChange: PropTypes.func.isRequired,
};

export default ClosableTag;
