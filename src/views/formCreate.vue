<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://www.form-create.com/v3/guide/" target="_blank">form-create v3</a>
        ;
        <a href="https://github.com/xaboy/form-create-designer" target="_blank">form-create-designer 目前不支持</a>
        ;
        <a href="https://gitee.com/kcz66/epic-designer" target="_blank">或者使用epic-designer</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">FormCreate</a-divider>

    <a-button type="primary" @click="dialogVisible = true">formCreate</a-button>
    <a-modal v-model:open="dialogVisible" title="formCreate" :fullscreen="true" @ok="false" @close="false">
      <!-- <fc-designer :locale="locale"></fc-designer> -->
      <span>目前不支持</span>
    </a-modal>
  </div>
</template>
<script lang="ts" setup name="DemoFormCreate">
// import En from "@form-create/designer/locale/en.js";
// import ZhCn from "@/i18n/formCreate/zh-cn";
// import En from "@/i18n/formCreate/en";
import { ref } from "vue";

// const locale = ref(ZhCn);
const dialogVisible = ref(false);
</script>

<style lang="less" scoped>
:deep(.form-create-dialog) {
  .el-dialog__body {
    padding: 0;
    height: calc(100vh - 54px);
    overflow-y: auto;
  }
}
</style>
