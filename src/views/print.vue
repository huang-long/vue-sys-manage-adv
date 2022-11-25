<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://github.com/Power-kxLee/vue-print-nb#vue3-version" target="_blank">vue-print-nb</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">print</a-divider>

    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-button type="primary" size="small" icon="Printer" v-print="printObj">打印</a-button>
        <div id="loading" v-show="printLoading"></div>
      </a-col>
    </a-row>

    <a-divider orientation="center">打印区域</a-divider>

    <div id="printMe" class="print-area">
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team">
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
import type { Ref } from 'vue';
import { ref } from 'vue';
// @ts--ignore 
// import print from 'vue3-print-nb';

interface DataItem {
  title: string;
}

const data: Ref<DataItem[]> = ref([
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]);

let printLoading = ref(true);
let printObj = ref({
  id: "printMe",
  popTitle: 'good print',
  extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue: { printLoading: boolean; }) {
    vue.printLoading = true
    console.log('打开之前')
  },
  openCallback(vue: { printLoading: boolean; }) {
    vue.printLoading = false
    console.log('打开打印页面')
  },
  closeCallback(vue: any) {
    console.log('关闭了打印工具')
  }
})

</script>
<style lang="less" scoped>
.print-area {
  max-width: 800px;
}
</style>