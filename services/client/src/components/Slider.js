import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Slider as AntdSlider } from 'antd';
import useDebounce from 'hooks/useDebounce';

const Slider = React.forwardRef(({ value: defaultValue, onChange, ...restProps }, ref) => {
  const [state, setState] = useState(defaultValue);

  useEffect(
    () => setState(defaultValue),
    [defaultValue]
  );

  const [debouncedUpdate] = useDebounce(
    value => onChange(value),
    500
  );

  return (
    <AntdSlider
      {...restProps}
      ref={ref}
      value={Number(state)}
      onChange={val => {
        const value = parseInt(val, 10);

        setState(value);
        debouncedUpdate(value);
      }}
    />
  );
});

Slider.propTypes = {
  // eslint-disable-next-line
  value: PropTypes.any,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  onChange: () => {},
};

export default Slider;
