<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://github.com/huang-long/vue3-print-ts" target="_blank">vue-print-ts</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">print</a-divider>

    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-button v-print="printObj" type="primary" size="small" icon="Printer">打印</a-button>
        <div v-show="printLoading" id="loading"></div>
      </a-col>
    </a-row>

    <a-divider orientation="center">打印区域</a-divider>

    <div id="printMe" class="print-area">
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta description="Ant Design, a design language for background applications, is refined by Ant UED Team">
              <template #title>
                <a href="https://www.antdv.com/">{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <a-divider orientation="center">打印区域</a-divider>
  </div>
</template>

<script lang="ts" setup name="DemoPrint" directives="print">
import type { Ref } from "vue";
import { ref } from "vue";
import type { PrintConf } from "vue3-print-ts";

interface DataItem {
  title: string;
}

const data: Ref<DataItem[]> = ref([
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
]);

const printLoading = ref(true);
const printObj = ref<PrintConf>({
  ids: "printMe",
  printTitle: "打印测试",
  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  showBackground: true,
  beforePrint() {
    console.log("打印之前");
  },
  afterPrint() {
    console.log("打印之后");
  },
});
</script>
<style lang="less" scoped>
.print-area {
  max-width: 800px;
}
</style>
