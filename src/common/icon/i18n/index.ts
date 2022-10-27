/*
 * @Author: i1mT
 * @Date: 2022-10-27 10:12:51
 * @LastEditors: i1mT
 * @LastEditTime: 2022-10-27 10:13:11
 * @Description:
 * @FilePath: \YuqueBlog\src\common\icon\i18n\index.ts
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
    },
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
