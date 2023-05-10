import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Icon, Collapse } from 'antd';

import CategoryItemFilter from './ExploreCubesCategoryItemFilter';

import s from './ExploreCubesSubSection.module.css';

const { Panel } = Collapse;

const defaultExtra = <div>•</div>; 

const ExploreCubesSubSection = ({ name, subSection, children, onFilterUpdate, selectedFilters }) => {
  const [openedSubSection, setOpenedSubSection] = useState(false);

  const { haveSelected, subSectionType } = subSection;

  let extra = haveSelected ? defaultExtra : null;

  if (subSectionType === 'time') {
    const member = subSection.members.find(item => !item.granularity);
    const selectedFilterIndex = selectedFilters.indexOf(member.name);

    extra = (
      <CategoryItemFilter
        isVisible
        onFilterUpdate={onFilterUpdate}
        selectedFilterIndex={selectedFilterIndex}
        member={member}
      />
    );
  }

  return (
    <Collapse
      bordered={false}
      activeKey={openedSubSection}
      defaultActiveKey={openedSubSection}
      onChange={setOpenedSubSection}
      className={
        cx({
          [s.subSection]: true,
          [s.active]: !!haveSelected,
        })
      }
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
    >
      <Panel
        key={name}
        header={name}
        className={s.panelSubSection}
        extra={extra}
      >
        {children}
      </Panel>
    </Collapse>
  );
};

ExploreCubesSubSection.propTypes = {
  name: PropTypes.string.isRequired,
  subSection: PropTypes.bool.isRequired,
  onFilterUpdate: PropTypes.shape({
    add: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  children: PropTypes.object.isRequired,
  selectedFilters: PropTypes.array.isRequired,
};

export default ExploreCubesSubSection;
