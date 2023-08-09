import React, { useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import { Select, Input, DatePicker } from 'antd';
import trackEvent from 'utils/trackEvent';
import moment from 'moment';
import InputDate from './InputDate';
import useDebounce from 'hooks/useDebounce';
import { locales } from 'hooks/useFormItems';

const { RangePicker } = DatePicker;

const rangeOperators = ['inDateRange', 'notInDateRange'];
const inputlessOperators = ['set', 'notSet'];

const filterInputs = {
  string: ({ values, onChange }) => {
    console.log(values);

    return (
      <Select key="input" style={{ width: 300 }} mode="tags" onChange={onChange} value={values} />
    );
  },
  number: ({ values, onChange }) => (
    <Input
      key="input"
      style={{ width: 300 }}
      onChange={e => onChange([e.target.value])}
      value={(values && values[0]) || ''}
    />
  ),
  time: ({ values, onChange }) => (
    <InputDate
      values={values}
      onChange={onChange}
    />
  ),
  timeRange: ({ values, onChange }) => {
    let value;
    if (typeof values === 'object') {
      value = values.map(v => moment(v));
    }

    return (
      <RangePicker
        key="input"
        onChange={onChange}
        value={value}
        locale={locales?.[i18n.language] || locales.en}
      />
    );
  },
};

filterInputs.string.propTypes = {
  values: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

filterInputs.string.defaultProps = {
  values: [],
};

filterInputs.number.propTypes = {
  values: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

filterInputs.number.defaultProps = {
  values: [],
};

filterInputs.time.propTypes = {
  values: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string]),
  onChange: PropTypes.func.isRequired,
};

filterInputs.time.defaultProps = {
  values: [],
};

filterInputs.timeRange.propTypes = {
  values: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string]),
  onChange: PropTypes.func.isRequired,
};

filterInputs.timeRange.defaultProps = {
  values: [],
};

const FilterInput = ({ member, updateMethods, addMemberName }) => {
  const [memberValues, setMemberValues] = useState((member.values || []));

  const [debouncedUpdate] = useDebounce(
    ({ values }) => {
      trackEvent('Update Filter Values', { memberName: addMemberName });

      updateMethods.update(member, { ...member, values });
    },
    500
  );

  if (!member || inputlessOperators.includes(member.operator)) {
    return null;
  }

  const dimensionType = member.dimension.type || '';
  let Filter = filterInputs[dimensionType] || filterInputs.string;

  if (rangeOperators.includes(member.operator)) {
    Filter = filterInputs.timeRange;
  }

  return (
    <Filter
      key="filter"
      values={memberValues}
      dimensionType={dimensionType}
      onChange={values => {
        setMemberValues(values);
        debouncedUpdate({ values });
      }}
    />
  );
};

FilterInput.propTypes = {
  member: PropTypes.object.isRequired,
  addMemberName: PropTypes.string.isRequired,
  updateMethods: PropTypes.object.isRequired,
};

export default FilterInput;
