

<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <a-divider>测试登录</a-divider>
    <a-row>
      <el-descriptions :title="'不同用户登录'" :column="1">
        <el-descriptions-item label="">使用<router-link to="/login">admin/123456</router-link>登录</el-descriptions-item>
        <el-descriptions-item label="">使用<router-link to="/login">other/123456</router-link>登录</el-descriptions-item>
      </el-descriptions>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script lang="ts" setup name="DemoPermission">
</script>
