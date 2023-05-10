/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { Button, Icon } from 'antd';

import s from './ExploreCubesCategoryItemFilter.module.css';

const CategoryItemFilter = ({ isVisible, selectedFilterIndex, onFilterUpdate, member }) => {
  const filterMember = { dimension: member };

  const addFilter = e => {
    onFilterUpdate.add(filterMember);

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const toggleFilter = e => {
    if (selectedFilterIndex === -1) {
      onFilterUpdate.add(filterMember);
    }
    
    onFilterUpdate.remove({ ...filterMember, index: selectedFilterIndex });

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div style={{ textAlign: 'right' }}>
      <Button 
        size="small"
        className={cx(s.filter, { active: selectedFilterIndex > -1 })}
        onClick={toggleFilter}
        onMouseDown={e => e.preventDefault()}
      >
          Filter
      </Button>
      {selectedFilterIndex > -1 && (
        <Button 
          size="small"
          className={cx(s.filter)}
          style={{ marginLeft: 5 }}
          onClick={addFilter}
          onMouseDown={e => e.preventDefault()}
        >
          <Icon type="plus" />
        </Button>
      )}
    </div>
  );
};

CategoryItemFilter.propTypes = {
  isVisible: PropTypes.object.isRequired,
  onFilterUpdate: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired,
  selectedFilterIndex: PropTypes.number.isRequired
};

export default CategoryItemFilter;
