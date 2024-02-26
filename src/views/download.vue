<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">文件下载</a-col>
    </a-row>

    <div>
      <a-divider orientation="left">链接下载</a-divider>
      <a href="/sys-api/file/test1.xlsx" :download="fileName">下载</a>
      <a-divider orientation="left">Blob下载（处理一些特殊情况）</a-divider>
      <a href="javascript:void(0)" @click="download">下载</a>
      <a-divider orientation="left">Blob图片展示（处理一些特殊情况）</a-divider>
      <img style="width: 100px; height: 100px" :src="imageUrl" />
    </div>
  </div>
</template>
<script lang="ts" setup name="DemoDownload">
import { onBeforeMount, onUnmounted, ref } from "vue";
import { downloadFile, downFile } from "../api/manage";

const fileName = ref("表格.xlsx");
const imageUrl = ref("");

let tempUrl = "";

onBeforeMount(() => {
  downFile("/image/test.jpg").then((data) => {
    tempUrl = window.URL.createObjectURL(data);
    imageUrl.value = tempUrl;
  });
});

onUnmounted(() => {
  window.URL.revokeObjectURL(tempUrl); // 释放掉blob对象
});

const download = function () {
  downloadFile("/file/test1.xlsx", "表格.xlsx", {});
};
</script>

<style lang="less" scoped></style>
