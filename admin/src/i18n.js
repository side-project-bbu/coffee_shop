import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import kh from "./locales/kh.json";

const messages = {
  en,
  kh,
};

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
