import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";

const fallbackLng = ["ru"];
const availableLanguages = ["en", "ru"];

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true,
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, //   <---- this will do the magic
    },
  });

export default i18n;
