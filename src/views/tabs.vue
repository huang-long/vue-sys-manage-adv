<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://www.antdv.com/components/tabs-cn" target="_blank">tabs文档</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">tabs</a-divider>

    <a-radio-group v-model:value="tabPosition" style="margin: 8px">
      <a-radio-button value="top">top</a-radio-button>
      <a-radio-button value="bottom">bottom</a-radio-button>
      <a-radio-button value="left">left</a-radio-button>
      <a-radio-button value="right">right</a-radio-button>
    </a-radio-group>
    <a-tabs v-model:activeKey="activeKey" :tab-position="tabPosition" type="card">
      <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup name="DemoTabs">
import { ref } from "vue";
const activeKey = ref("1");
const tabPosition = ref("top");
</script>
<style lang="less" scoped></style>
