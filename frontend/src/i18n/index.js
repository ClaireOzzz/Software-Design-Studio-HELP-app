import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';

// languages
// import en from "./en.json";
// import de from "./de.json";
// import el from "./el.json";
// import ru from "./ru.json";

// translations
// const resources = {
//   en: { translation: en },
//   de: { translation: de },
//   el: { translation: el },
//   ru: { translation: ru },
// }
export const defaultLanguage = "en";

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// use for displaying language option
export const lang = [
  {value:"en", name:"English"},
  {value:"de", name:"German"},
  {value:"el", name:"Greek"},
  {value:"ru", name:"Russian"},
]

export default i18n;