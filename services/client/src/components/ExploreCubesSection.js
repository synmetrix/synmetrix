import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { set, getOr, get } from 'unchanged';

import { Typography } from 'antd';

import clearSelection from 'utils/clearSelection';

import useKeyPress from 'hooks/useKeyPress';

import { SHOWN_CATEGORIES } from 'components/ExploreCubes';
import ExploreCubesSubSection from 'components/ExploreCubesSubSection';
import ExploreCubesCategoryItem from 'components/ExploreCubesCategoryItem';
import { granularities } from '../hooks/useDataSourceMeta';
import useAnalyticsQueryMembers from '../hooks/useAnalyticsQueryMembers';

import s from './ExploreCubes.module.css';

const { Text } = Typography;

const toFilter = member => ({
  dimension: member.dimension.name,
  operator: member.operator,
  values: member.values,
});

const granulateMember = (member) => {
  // console.log('gran memb', member);
  const newMembers = [];

  granularities.forEach(g => {
    let newName = member.name;
    let newTitle = member.title;
    let newShortTitle = member.shortTitle; 

    if (g.name) {
      newName += `+${g.name}`;
      newTitle += ` (${g.title})`;
      newShortTitle += ` (${g.title})`;
    };

    const newMember = {
      ...member,
      name: newName,
      title: newTitle,
      shortTitle: newShortTitle,
      granularity: g.name,
      dimension: 'dimension',
      meta: {
        subSection: member.shortTitle,
      },
    };

    newMembers.push(newMember);
  });

  return newMembers;
};

const getSubSections = (catMembers, membersIndex) => {
  const subSections = {};
  const freeMembers = [];

  catMembers.forEach(m => {
    const member = m;
    const subSection = getOr(false, 'meta.subSection', member);

    if (member.type === 'time') {
      const granMembers = granulateMember(member);
      subSections[member.shortTitle] = {
        members: granMembers,
      };
      return;
    }

    if (!subSection) {
      freeMembers.push(member);
      return;
    }

    if (!subSections[subSection]) {
      subSections[subSection] = {
        members: [],
        haveSelected: false,
      };
    }

    subSections[subSection].members.push(member);
  });

  Object.keys(subSections).forEach(subSection => {
    const foundSelected = subSections[subSection].members.find(subMember => get([subMember.name], membersIndex));

    if (foundSelected) {
      subSections[subSection].haveSelected = true;
    }
  });

  return {
    subSections,
    freeMembers,
  };
};

const Cube = ({ members, selectedMembers, onMemberSelect }) => {
  const { baseMembers: { index: membersIndex } } = useAnalyticsQueryMembers({ selectedQueryMembers: selectedMembers });
  // console.log('selected members', selectedMembers);
  const shiftPress = useKeyPress('Shift');

  const [state, setState] = useState({
    lastClickedMember: {},
    hovered: {},
  });
  console.log('members', members);
  const getMemberId = member => member.name.replace('.', '_');
  const getMembersCategory = category => Object.values(members[category] || {});
  const getSelectedCategoryMembers = category => Object.values(selectedMembers[category] || {}).map(m => m.name.replace(/\+.+/, ''));
  
  const onAction = (type = 'over', member, memberMeta = {}) => {
    console.log('clicked member', member);
    if (!member) {
      return;
    }
    const name = getMemberId(member);
    if (type === 'click') {
      // console.log(name);
      const {
        category: nextCategory,
        index: nextIndex,
        selectedIndex,
      } = memberMeta;
      console.log('ollo', nextCategory, nextIndex, selectedIndex);
      setState(prev => set(['lastClickedMember'], memberMeta, prev));

      // select more than one members if shift pressed
      if (shiftPress) {
        const {
          category: prevCategory,
          index: prevIndex,
        } = state.lastClickedMember;

        // don't fire if not the same category
        if (prevCategory !== nextCategory) {
          return;
        }

        let catFilter = () => { };

        if (nextIndex > prevIndex) {
          catFilter = (_, index) => index <= nextIndex && index > prevIndex;
        } else {
          catFilter = (_, index) => index >= nextIndex && index < prevIndex;
        }

        const selectMembers = getMembersCategory(nextCategory).filter(catFilter);
        const categorySelectedMembers = getSelectedCategoryMembers(nextCategory);

        // need buffer because selectedMembers update is not immediately
        const categorySelectedMembersBuffer = categorySelectedMembers;
        selectMembers.forEach(catMember => {
          const catSelectedIndex = categorySelectedMembersBuffer.indexOf(catMember.name);

          if (catSelectedIndex === -1) {
            onMemberSelect(nextCategory).add(catMember);
          } else {
            onMemberSelect(nextCategory).remove({ ...catMember, index: catSelectedIndex });
            categorySelectedMembersBuffer.splice(catSelectedIndex, 1);
          }
        });

        clearSelection();
        return;
      }

      if (selectedIndex === -1) {
        onMemberSelect(nextCategory).add(member);
      } else {
        onMemberSelect(nextCategory).remove({ ...member, index: selectedIndex });
      }

      return;
    }

    if (type === 'over') {
      setState(prev => set(['hovered', name], 'over', prev));
      return;
    }

    if (type === 'focus') {
      setState(prev => set(['hovered', name], 'focus', prev));
      return;
    }

    setState(prev => set(['hovered', name], false, prev));
  };

  const getItem = (category, member, index, categorySelectedMembers, selectedFilters) => {
    const selectedIndex = categorySelectedMembers.indexOf(member.name);
    const selectedFilterIndex = selectedFilters.indexOf(member.name);

    return (
      <ExploreCubesCategoryItem
        key={member.name}
        member={member}
        category={category}
        onAction={(...args) => onAction(...args, { index, category, selectedIndex })}
        selectedIndex={selectedIndex}
        selectedFilterIndex={selectedFilterIndex}
        onFilterUpdate={onMemberSelect('filters', toFilter)}
        hoverState={state.hovered[getMemberId(member)]}
      />
    );
  };

  const getCategory = (category) => {
    const catMembers = getMembersCategory(category);
    if (!catMembers.length) {
      return null;
    }
    // console.log(catMembers);
    const {
      subSections,
      freeMembers
    } = getSubSections(catMembers, membersIndex);

    const categorySelectedMembers = getSelectedCategoryMembers(category);
    const selectedFilters = Object.values(selectedMembers.filters || {}).map(m => m.dimension.name);

    return (
      <div key={category} className={s.categorySection}>
        <Text className={s.categoryTitle}>{category}</Text>
        <div className={s.freeMembers}>
          {freeMembers.map((member, index) => getItem(category, member, index, categorySelectedMembers, selectedFilters))}
        </div>
        {Object.keys(subSections).map(subSectionKey => (
          <ExploreCubesSubSection
            name={subSectionKey}
            haveSelected={subSections[subSectionKey].haveSelected}
          >
            {subSections[subSectionKey].members.map((member, index) => getItem(category, member, index, categorySelectedMembers, selectedFilters))}
          </ExploreCubesSubSection>
        )
        )}
      </div>
    );
  };

  return SHOWN_CATEGORIES.map(getCategory);
};

Cube.propTypes = {
  members: PropTypes.object.isRequired,
  onMemberSelect: PropTypes.func.isRequired,
  selectedMembers: PropTypes.object.isRequired,
};

export default Cube;
