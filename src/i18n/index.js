import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend';
import LocalStorage from 'i18next-localstorage-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import en from './dictionary.json';

export const languages = ['en', 'ru'];

i18n
  .use(intervalPlural)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    whitelist: languages,
    preload: ['ru'],
    resources: {
      en: {
        translation: en
      }
    },
    partialBundledLanguages: true,
    interpolation: {
      escapeValue: false,
      format: function (value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        if (value instanceof Date) return moment(value)
          .format(format);
        return value;
      }
    },
    debug: true,
    react: {
      useSuspense: false
    },
    detection: {
      order: ['querystring', 'localStorage', 'htmlTag', 'subdomain'],
      // query string language http://localhost:3000/?lang=ru
      lookupQuerystring: 'lang',
      caches: ['localStorage']
    },
    backend: {
      backends: [
        LocalStorage,  // primary
        HttpApi  // fallback
      ],
      backendOptions: [{
        // prefix for stored languages
        prefix: 'i18next_res_',

        // expiration
        expirationTime: 7 * 24 * 60 * 60 * 1000,
      }, {
        loadPath: '/locales/{{lng}}.json' // http api load path for my own fallback
      }],
    },
  })
  .then(() => {
    console.log('i18n initialized');
  });

export default i18n;
