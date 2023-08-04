import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorageState } from 'ahooks';

import ru from 'flag-icons/flags/4x3/ru.svg';
import us from 'flag-icons/flags/4x3/us.svg';

import { Select } from 'antd';

import s from './LanguageSelect.module.css';

const { Option } = Select;

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [state, setState] = useLocalStorageState('locale', 'en');

  const options = [
    { value: 'en', icon: us },
    { value: 'ru', icon: ru },
  ];

  const handleChange = useCallback((lang) => {
    i18n.changeLanguage(lang);
    setState(lang);
  }, [i18n, setState]);

  useEffect(() => {
    if (state) {
      handleChange(state);
    }
  }, [state, handleChange]);

  return (
    <Select
      defaultValue={state}
      onChange={setState}
      className={s.select}
      dropdownClassName={s.dropdown}
    >
      {options.map(v => (
        <Option key={v.value} value={v.value}>
          <img
            alt=''
            className={s.image}
            src={v.icon}
          />
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;