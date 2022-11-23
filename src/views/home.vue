<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <a-calendar v-model:value="value" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dayjs } from 'dayjs';

const value = ref<Dayjs>();
// defineExpose无需导入，直接使用
// defineExpose({ value });
</script>
