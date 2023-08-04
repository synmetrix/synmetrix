import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorageState } from 'ahooks';
import { DEFAULT_LANGUAGE } from '../i18n';

import ru from 'flag-icons/flags/4x3/ru.svg';
import us from 'flag-icons/flags/4x3/us.svg';

import { Select } from 'antd';

import s from './LanguageSelect.module.css';

const { Option } = Select;

const availableLangs = {
  en: us,
  ru,
};

const getLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  const langs = Object.keys(availableLangs);

  let setLang = langs.find(lang => userLang.includes(lang));

  if (!setLang) {
    setLang = DEFAULT_LANGUAGE;
  }

  return setLang;
};

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [state, setState] = useLocalStorageState('locale', getLanguage());

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
      {Object.entries(availableLangs).map(([lang, icon]) => (
        <Option key={lang} value={lang}>
          <img
            alt=''
            className={s.image}
            src={icon}
          />
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;