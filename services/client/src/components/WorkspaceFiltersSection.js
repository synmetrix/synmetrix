import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Button, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

import CountBadge from 'components/CountBadge';
import ExploreDataFilters from 'components/ExploreDataFilters';

import s from './ExploreWorkspace.module.css';

const { Panel } = Collapse;

const toFilter = member => ({
  dimension: member.dimension.name,
  operator: member.operator,
  values: member.values,
});

const WorkspaceFiltersSection = (props) => {
  const { t } = useTranslation();

  const {
    onToggleSection,
    onMemberChange,
    state,
    selectedQueryMembers,
    availableQueryMembers,
    ...restProps
  } = props;

  const onFilterChange = useMemo(() => onMemberChange('filters', toFilter), [onMemberChange]);

  return (
    <Panel
      {...restProps}
      className={s.panel}
      header={(
        <>
          <Button type="dashed" size="small" onClick={() => onToggleSection('filtersSec')}>
            {t('Filters')}
          </Button>

          <CountBadge count={state.filtersCount} style={{ marginLeft: 10 }} />
        </>
      )}
    >
      <ExploreDataFilters
        availableQueryMembers={availableQueryMembers}
        selectedQueryMembers={selectedQueryMembers}
        onMemberChange={onFilterChange}
      />
    </Panel>
  );
};

WorkspaceFiltersSection.propTypes = {
  onToggleSection: PropTypes.func.isRequired,
  onMemberChange: PropTypes.func.isRequired,
  availableQueryMembers: PropTypes.object.isRequired,
  selectedQueryMembers: PropTypes.shape({
    measures: PropTypes.array,
    dimensions: PropTypes.array,
    segments: PropTypes.array,
    filters: PropTypes.array,
  }).isRequired,
  state: PropTypes.shape({
    filtersCount: PropTypes.number,
  }),
};

WorkspaceFiltersSection.defaultProps = {
  state: {},
};

export default WorkspaceFiltersSection;
