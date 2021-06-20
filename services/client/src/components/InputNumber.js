import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';
import useDebounce from 'hooks/useDebounce';

const InputNumber = React.forwardRef(({ value: defaultValue, onChange, step, ...restProps }, ref) => {
  const [state, setState] = useState(defaultValue);

  useEffect(
    () => setState(defaultValue),
    [defaultValue]
  );

  const [debouncedUpdate] = useDebounce(
    value => onChange(value),
    200
  );

  return (
    <Input
      {...restProps}
      ref={ref}
      type="number"
      step={step || 'any'}
      value={state}
      onChange={e => {
        const value = parseFloat(e.target.value);

        setState(value);
        debouncedUpdate(value);
      }}
    />
  );
});

InputNumber.propTypes = {
  // eslint-disable-next-line
  value: PropTypes.any,
  onChange: PropTypes.func,
  step: PropTypes.any,
};

InputNumber.defaultProps = {
  onChange: () => {},
  step: null,
};

export default InputNumber;
