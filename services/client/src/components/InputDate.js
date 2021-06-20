import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { DatePicker, Button, Input, message } from 'antd';
import PopoverButton from 'components/PopoverButton';
import useDebounce from 'hooks/useDebounce';
import useXState from 'hooks/useXState';

import s from './InputDate.module.css';

const items = [
  'Today',
  'Last 7 days',
  'Yesterday',
  'Last 30 days',
  'This week',
  'Last week',
  'This month',
  'Last month',
  'This quarter',
  'Last quarter',
  'This year',
  'Last year'
];

const FORMAT = 'YYYY-MM-DD';

const InputDate = ({ values, onChange }) => {
  const filterContainer = useRef(null);

  let inputValue;

  try {
    if (typeof values === 'string') {
      inputValue = values;
    } else {
      inputValue = moment(values[0]).format(FORMAT);
    }
  } catch(e) {
    console.error(e);
    message.error('Can\'t parse the date value');
  }

  const [state, updateState] = useXState({
    inputValue,
    datePickerVisible: false,
    popoverVisible: false,
  });

  useEffect(() => {
    updateState({ inputValue });
  },
  [inputValue, updateState]
  );

  const changeValues = (value) => {
    if (typeof value === 'object') {
      const beginOfDate = moment(value).startOf('day');
      const endOfDate = moment(value).endOf('day');
      onChange([beginOfDate, endOfDate]);
    } else {
      onChange(value);
    }
  };

  const [delayedOnchange] = useDebounce(newValue => {
    if (newValue) {
      changeValues(newValue);
    }
  }, 500);

  const onInputChange = (e) => {
    const { value: newValue } = e.target;
    updateState({ inputValue: newValue });
    delayedOnchange(newValue);
  };

  const toggleDatePicker = vis => {
    updateState({ datePickerVisible: vis, popoverVisible: vis });
  };

  const onDateChange = (dateValue) => {
    toggleDatePicker(false);
    changeValues(dateValue);
  };

  const onDateClick = (dateValue) => {
    const formatedValue = moment(dateValue).format(FORMAT);
    onDateChange(formatedValue);
  };

  let datePickerValue;
  if (state.inputValue) {
    datePickerValue = moment(state.inputValue);

    if (!datePickerValue.isValid()) {
      datePickerValue = null;
    }
  }

  return (
    <div className={s.inputDate} ref={filterContainer}>
      <Input
        style={{ width: '200px' }}
        onChange={onInputChange}
        value={state.inputValue}
        suffix={(
          <PopoverButton
            getPopupContainer={() => filterContainer.current}
            iconType="calendar"
            style={{ borderColor: 'transparent', boxShadow: 'none', color: 'rgba(0, 0, 0, 0.25)' }}
            overlayClassName={s.popoverOverlay}
            onVisibleChange={(vis) => toggleDatePicker(vis)}
            visible={state.popoverVisible}
            content={(
              <DatePicker
                value={datePickerValue}
                format={FORMAT}
                allowClear
                size="small"
                key="input"
                onChange={onDateClick}
                open={state.datePickerVisible}
                showToday={false}
                getCalendarContainer={() => filterContainer.current}
                renderExtraFooter={() => (
                  <div className={s.footerContainer}>
                    {items.map(i => (
                      <Button
                        key={i}
                        className={s.button}
                        size='small'
                        onClick={() => onDateChange(i)}
                      >
                        {i}
                      </Button>
                    ))}
                  </div>
                )}
              />
            )}
            trigger="click"
          />
        )}
      />

    </div>
  );
};

InputDate.propTypes = {
  values: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputDate;
