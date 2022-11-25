<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://www.antdv.com/components/icon-cn" target="_blank">Ant Design Vue icon</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">icon</a-divider>

    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <github-filled />
      </a-col>
    </a-row>

    <div class="code">
      npm install --save @ant-design/icons-vue
    </div>
  </div>
</template>

<script lang="ts" setup name="DemoIcon">
</script>
<style lang="less" scoped>
.code {
  background: #f5f5f5;
  margin: 16px 0;
  padding: 12px 20px;
  overflow: auto;
}
</style>