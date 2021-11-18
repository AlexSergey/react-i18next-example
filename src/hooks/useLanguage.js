import { getI18n } from 'react-i18next';
import { useLayoutEffect, useState } from 'react';

export const useLanguage = () => {
  const i18next = getI18n();
  const [lang, setLang] = useState(i18next.language);
  useLayoutEffect(() => {
    const setLanguage = lng => setLang(lng);
    i18next.on('languageChanged', setLanguage);
    return () => i18next.off('languageChanged', setLanguage);
  }, []);
  return lang;
}
