import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'antd';

import s from './FilterTags.module.css';

const { CheckableTag } = Tag;

const FilterTags = ({ tableState, updateTableState }) => {
  const { selectedTags, allTags } = tableState;

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    updateTableState({ selectedTags: nextSelectedTags, currentPage: 1 });
  };

  if (!allTags.length) {
    return null;
  }

  return (
    <div className={s.filterTags}>
      <h3 className={s.header}>Tags:</h3>
      {allTags.map(tag => (
        <CheckableTag
          className={s.tag}
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={checked => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  );
};

FilterTags.propTypes = {
  tableState: PropTypes.shape({
    allTags: PropTypes.arrayOf(PropTypes.string),
    selectedTags: PropTypes.arrayOf(PropTypes.string),
  }),
  updateTableState: PropTypes.func.isRequired,
};

FilterTags.defaultProps = {
  tableState: {
    allTags: [],
    selectedTags: [],
  }
};

export default FilterTags;
