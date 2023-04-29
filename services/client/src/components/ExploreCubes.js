import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Radio, Badge, Icon, Row, Collapse, Input } from 'antd';

import { withTranslation } from 'react-i18next';

import useCubesList from 'hooks/useCubesList';
import ErrorMessage from 'components/ErrorMessage';
import CountBadge from 'components/CountBadge';

import ExploreCubesSection from 'components/ExploreCubesSection';

import s from './ExploreCubes.module.css';

const { Panel } = Collapse;

export const SHOWN_CATEGORIES = ['dimensions', 'measures', 'segments'];

export const showSelectedCount = (count) => (
  <Badge
    count={count}
    style={{
      backgroundColor: '#c1c7cc',
      padding: '0 13px',
      fontSize: '10px',
      color: '#000',
      boxShadow: 'none',
      fontWeight: 700,
      borderRadius: '100px',
      height: 13,
      minHeight: 13,
      lineHeight: '13px'
    }}
  />
);

const ExploreCubes = ({ t, availableQueryMembers, onMemberSelect, selectedQueryMembers, dataSchemaValidation }) => {
  const { state, setState } = useCubesList({
    query: '',
    availableQueryMembers,
    categories: SHOWN_CATEGORIES,
    openedCubes: [],
  });

  const options = useMemo(
    () => Object.keys(state.members || {}).map(cube => {
      const members = state.members[cube];

      const hasMembers = Object.values(members).some(category => !!Object.values(category).length);

      if (!members || !hasMembers) {
        return null;
      }

      const cubeSelectedItems = Object.values(selectedQueryMembers || {})
          .flat()
          .filter(m => (m.name || '').split('.')[0].toLowerCase() === cube.toLowerCase());

      const cubeSelectedCount = cubeSelectedItems.reduce((acc, item) => {
        const isMemberExists = !!acc.find(accItem => accItem.dimension === item.dimension && accItem.granularity == item.granularity);

        if (isMemberExists) {
          return acc;
        }

        acc.push(item);
        return acc;
      }, []).length;

      return (
        <Panel
          key={cube}
          header={cube}
          className={s.panel}
          extra={<CountBadge count={cubeSelectedCount} />}
        >
          <ExploreCubesSection
            selectedMembers={selectedQueryMembers}
            members={members}
            onMemberSelect={onMemberSelect}
          />
        </Panel>
      );
    }),
    [state, onMemberSelect, selectedQueryMembers]
  );

  const onSearch = (query, categories) => {
    let openedCubes = [];

    // if query or specific category then open cubes
    if (query || (categories.length === 1)) {
      openedCubes = Object.keys(state.members);
    }

    setState(prev => ({
      ...prev,
      query,
      categories,
      openedCubes,
    }));
  };

  let timer;
  const onChange = e => {
    const { value } = e.target;

    clearTimeout(timer);
    timer = setTimeout(() => onSearch(value, state.categories), 300);
  };

  const onFilterChange = e => {
    const { value } = e.target;

    setState(prev => ({ ...prev, radioValue: value }));

    const onButtonClick = {
      all: () => onSearch(
        state.query,
        SHOWN_CATEGORIES,
      ),
      dimensions: () => onSearch(
        state.query,
        ['dimensions'],
      ),
      measures: () => onSearch(
        state.query,
        ['measures'],
      ),
    };

    onButtonClick[value]();
  };

  const onCollapse = (activeKey) => {
    setState(prev => ({ ...prev, openedCubes: activeKey }));
  };

  const dataSchemaError = { type: 'error', text: '' };
  if (dataSchemaValidation.error) {
    dataSchemaError.text = `${t('Bad Data Schema')}.\n${dataSchemaValidation.error.message}`;
  }

  return (
    <>
      <Row type="flex" align="middle" justify="center" className={s.filterControls}>
        <Input
          className={s.searchInput}
          prefix={<Icon type="search" />}
          placeholder="Find..."
          size="small"
          onChange={onChange}
          allowClear
        />
        <Radio.Group value={state.radioValue} size="small" onChange={onFilterChange} className={s.buttonGroup}>
          <Radio.Button value="all">{t('All')}</Radio.Button>
          <Radio.Button value="dimensions">{t('Dimensions')}</Radio.Button>
          <Radio.Button value="measures">{t('Measures')}</Radio.Button>
        </Radio.Group>
      </Row>
      <Row type="flex" align="middle" justify="space-between" className={s.root}>
        <ErrorMessage {...dataSchemaError} />
        <Collapse
          bordered={false}
          activeKey={state.openedCubes}
          defaultActiveKey={state.openedCubes}
          onChange={onCollapse}
          className={s.root}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          {options}
        </Collapse>
      </Row>
    </>
  );
};

ExploreCubes.propTypes = {
  t: PropTypes.func.isRequired,
  onMemberSelect: PropTypes.func.isRequired,
  availableQueryMembers: PropTypes.object,
  selectedQueryMembers: PropTypes.object,
  dataSchemaValidation: PropTypes.object,
};

ExploreCubes.defaultProps = {
  availableQueryMembers: {},
  selectedQueryMembers: {},
  dataSchemaValidation: {}
};

const enhance = withTranslation();

export default enhance(ExploreCubes);
