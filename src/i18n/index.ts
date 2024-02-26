import { createI18n } from "vue-i18n";
import zh from "./lang/zh-CN";
import en from "./lang/en-US";

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: "zh-CN",
  messages: {
    "zh-CN": { ...zh },
    "en-US": { ...en },
  },
});

export { i18n };
