<template>
  <div class="container">
    <a-result status="error" title="404" sub-title="啊哦~ 你所访问的页面不存在.">
      <template #extra>
        <router-link to="/">
          <a-button key="console" type="primary">返回首页</a-button>
        </router-link>
        <a-button key="buy" @click="goBack">返回上一页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup name="DemoError404">
import { useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
</style>

