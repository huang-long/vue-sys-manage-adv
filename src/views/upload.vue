

<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://www.antdv.com/components/upload-cn" target="_blank">Ant Design Vue
          upload配置</a>
      </a-col>
    </a-row>

    <a-divider orientation="left">upload</a-divider>

    <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">Click or drag file to this area to upload</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </a-upload-dragger>
  </div>
</template>
<script lang="ts" setup name="DemoUpload">
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import type { UploadChangeParam } from 'ant-design-vue';

const handleChange = (info: UploadChangeParam) => {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
</script>

<style lang="less" scoped>
</style>
