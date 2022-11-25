
import { createI18n } from 'vue-i18n';
import zh from './lang/zh-CN';
import en from './lang/en-US';
// @ts-ignore
// import enUS from 'ant-design-vue/es/locale/en_US';
// @ts-ignore
// import zhCN from 'ant-design-vue/es/locale/zh_CN';

const i18n = createI18n({
    allowComposition: true,
    globalInjection: true,
    legacy: false,
    locale: 'zh-CN',
    messages: {
        'zh-CN': { ...zh },
        'en-US': { ...en }
    }
});

export {
    i18n
};