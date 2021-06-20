import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Empty } from 'antd';

import { getOr } from 'unchanged';

import FilterGroup from 'components/PlaygroundFilterGroup';

const ExploreDataFilters = ({ availableQueryMembers, selectedQueryMembers, onMemberChange }) => {
  const { filters = [] } = selectedQueryMembers;

  const concatedMembers = useMemo(
    () => {
      const cubes = Object.values(availableQueryMembers || {});

      const reducer = (acc, cube) =>([
        ...acc,
        ...Object.values(getOr({}, 'dimensions', cube)),
        ...Object.values(getOr({}, 'measures', cube))
      ]);

      return cubes.reduce(reducer, []);
    },
    [availableQueryMembers]
  );

  if (!filters.length) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  return (
    <div>
      <FilterGroup
        members={filters}
        availableMembers={concatedMembers}
        addMemberName="Filter"
        updateMethods={onMemberChange}
      />
    </div>
  );
};

ExploreDataFilters.propTypes = {
  availableQueryMembers: PropTypes.object.isRequired,
  selectedQueryMembers: PropTypes.shape({
    filters: PropTypes.array,
  }).isRequired,
  onMemberChange: PropTypes.shape({
    update: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
};

export default ExploreDataFilters;
