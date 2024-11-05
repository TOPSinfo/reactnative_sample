import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const EN = require('./locales/en.json');
const FR = require('./locales/fr.json');

const resources = {
  en: {
    translation: EN,
  },
  fr: {
    translation: FR,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  // react: {
  //   wait: true,
  // },
});

export default i18n;
