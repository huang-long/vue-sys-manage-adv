<template>
  <!-- 文档：  -->
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://501351981.github.io/vue-office/examples/docs/guide/" target="_blank">vue-office</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">Preview Word</a-divider>
    <a-space>
      <a-button
        type="primary"
        @click="
          dialogVisible = true;
          fileType = 'word';
        "
      >
        PreviewWord
      </a-button>
      <a-button
        type="primary"
        @click="
          dialogVisible = true;
          fileType = 'excel';
        "
      >
        PreviewExcel
      </a-button>
      <a-button
        type="primary"
        @click="
          dialogVisible = true;
          fileType = 'pdf';
        "
      >
        PreviewPdf
      </a-button>
    </a-space>
    <a-modal v-model:open="dialogVisible" :title="'Preview ' + fileType" width="100%'" wrap-class-name="full-modal" :footer="null">
      <vue-office-docx v-if="fileType === 'word'" :key="'word'" :src="word" @rendered="renderedHandler" @error="errorHandler" />
      <vue-office-excel v-else-if="fileType === 'excel'" :key="'excel'" :src="excel" @rendered="renderedHandler" @error="errorHandler" />
      <vue-office-pdf v-else-if="fileType === 'pdf'" :key="'pdf'" :src="pdf" @rendered="renderedHandler" @error="errorHandler" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup name="filePreviewWord">
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
import "@vue-office/docx/lib/index.css";
//引入VueOfficeExcel组件
import VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";
//引入VueOfficePdf组件
import VueOfficePdf from "@vue-office/pdf";

import { ref } from "vue";

const dialogVisible = ref(false);
const fileType = ref("");
const word = ref("/word/test.docx"); //设置文档网络地址，可以是相对地址
const excel = ref("/excel/test.xlsx"); //设置文档网络地址，可以是相对地址
const pdf = ref("/pdf/test.pdf"); //设置文档网络地址，可以是相对地址

const renderedHandler = () => {
  console.log("渲染完成");
};
const errorHandler = () => {
  console.log("渲染失败");
};
</script>
<style lang="less" scoped></style>
