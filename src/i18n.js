import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "@/lang/en.json";
import deJSON from "@/lang/de.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJSON,
    },
    de: {
      translation: deJSON,
    },
  },
  lng: localStorage.getItem("languageCode") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
