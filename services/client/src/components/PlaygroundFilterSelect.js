import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import useDebounce from '../hooks/useDebounce';

const { Option } = Select;

const PlaygroundFilterSelect = ({ availableMembers, value, onChange }) => {
  const [data, setData] = useState(availableMembers);

  const [handleSearch] = useDebounce(
    (val) => {
      let res = availableMembers;
      if (val) {
        res = availableMembers.filter(m => m.title && m.title.toLowerCase().includes(val));
      }
  
      setData(res);
    },
    200
  );

  return (
    <Select
      showSearch
      value={value}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      style={{ width: 240, marginRight: 8 }}
      onSearch={handleSearch}
    >
      {data.map(d => (
        <Option key={d.title} value={d.name} onClick={() => onChange(d)}>
          {d.title}
        </Option>
      ))}
    </Select>
  );
};

PlaygroundFilterSelect.propTypes = {
  availableMembers: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PlaygroundFilterSelect;
