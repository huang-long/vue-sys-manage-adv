<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://www.antdv.com/components/config-provider-cn#components-config-provider-demo-locale" target="_blank">Ant Design Vue i18n配置</a>
        &nbsp;&nbsp;&nbsp;
        <a href="https://vue-i18n.intlify.dev/guide/migration/vue3.html#how-to-migration" target="_blank">vue3 vue-i18n配置</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">i18n</a-divider>

    <a-row :gutter="24">
      通过切换语言按钮，来改变当前内容的语言。
      <a-button type="primary" @click="changeLang()" size="small">切换语言</a-button>
    </a-row>

    <a-divider orientation="left">vue3 vue-i18n</a-divider>

    <a-row>
      <a-descriptions :title="t('oldManAndSea.title')" :column="1" size="small">
        <a-descriptions-item label="1.">{{t('oldManAndSea.famous[0]')}}</a-descriptions-item>
        <a-descriptions-item label="2.">{{t('oldManAndSea.famous[1]')}}</a-descriptions-item>
        <a-descriptions-item label="3.">{{t('oldManAndSea.famous[2]')}}</a-descriptions-item>
        <a-descriptions-item label="5.">{{t('oldManAndSea.famous[3]')}}</a-descriptions-item>
        <a-descriptions-item label="5.">{{t('oldManAndSea.famous[4]')}}</a-descriptions-item>
      </a-descriptions>
    </a-row>

    <a-divider orientation="left">Ant Design Vue i18n</a-divider>

    <a-config-provider :locale="locale">
       <a-pagination :total="50" show-size-changer />
    </a-config-provider>
  </div>
</template>

<script lang="ts" setup name="DemoI18n">
import { useI18n } from "vue-i18n";
import type { ComponentInternalInstance } from "vue";
import { getCurrentInstance, computed } from "vue";
// @ts-ignore
import enUS from 'ant-design-vue/es/locale/en_US';
// @ts-ignore
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const locale = computed(() => (proxy?.$i18n.locale === "zh-CN" ? zhCN : enUS));
const changeLang = () => {
  if (proxy) {
    if (proxy.$i18n.locale == "zh-CN") {
      proxy.$i18n.locale = "en-US";
    } else {
      proxy.$i18n.locale = "zh-CN";
    }
  }
};
</script>
