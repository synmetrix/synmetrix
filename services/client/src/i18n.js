import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from '../locales/locales';
import moment from 'moment';
import 'moment/min/locales';

export const DEFAULT_LANGUAGE = 'en';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: locales,
    lng: DEFAULT_LANGUAGE,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

i18n.on('languageChanged', (lng) => {
  moment.locale(lng);
});

export default i18n;
