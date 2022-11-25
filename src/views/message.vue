<style lang="less" scoped>
</style>
<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://www.antdv.com/components/alert-cn" target="_blank">Ant Design Vue Alert</a>;
        <a href="https://www.antdv.com/components/drawer-cn" target="_blank">Ant Design Vue Drawer</a>;
        <a href="https://www.antdv.com/components/message-cn" target="_blank">Ant Design Vue Message</a>;
        <a href="https://www.antdv.com/components/modal-cn" target="_blank">Ant Design Vue Modal</a>;
        <a href="https://www.antdv.com/components/notification-cn" target="_blank">Ant Design Vue Notification</a>;
        <a href="https://www.antdv.com/components/popconfirm-cn" target="_blank">Ant Design Vue Popconfirm</a>;
      </a-col>
    </a-row>

    <a-divider orientation="left">Alert 警告提示</a-divider>
    <div class="alert">
      <a-alert message="Success Tips" type="success" show-icon closable />
      <a-alert message="Informational Notes" type="info" show-icon closable />
      <a-alert message="Warning" type="warning" show-icon />
      <a-alert message="Error" type="error" show-icon />
    </div>

    <a-divider orientation="left">Drawer 抽屉</a-divider>
    <div>
      <a-button type="primary" @click="showDrawer">Open</a-button>
      <a-drawer v-model:visible="visible" class="custom-class" style="color: red" title="Basic Drawer" placement="right"
        @after-visible-change="afterVisibleChange">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-drawer>
    </div>

    <a-divider orientation="left">Message 全局提示</a-divider>
    <div>
      <a-space>
        <a-button @click="success">Success</a-button>
        <a-button @click="error">Error</a-button>
        <a-button @click="warning">Warning</a-button>
      </a-space>
    </div>

    <a-divider orientation="left">Modal 对话框</a-divider>
    <div>
      <a-button type="primary" @click="showModal">Open Modal</a-button>
      <a-modal v-model:visible="visibleModal" title="Basic Modal" @ok="handleOk">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-modal>
    </div>

    <a-divider orientation="left">Notification 通知提醒框</a-divider>
    <div>
      <a-button type="primary" @click="openNotification">Open the notification box</a-button>
    </div>

    <a-divider orientation="left">Popconfirm 气泡确认框</a-divider>
    <div>
      <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No" @confirm="confirm"
        @cancel="cancel">
        <a-button type="primary">Delete</a-button>
      </a-popconfirm>
    </div>

  </div>
</template>

<script lang="ts" setup name="DemoMessage">
import { message, notification } from "ant-design-vue";
import { ref } from "vue";

const visible = ref<boolean>(false);
const afterVisibleChange = (bool: boolean) => {
  console.log('visible', bool);
};
const showDrawer = () => {
  visible.value = true;
};

const success = () => {
  message.success('This is a success message');
};
const error = () => {
  message.error('This is an error message');
};
const warning = () => {
  message.warning('This is a warning message');
};

const visibleModal = ref<boolean>(false);
const showModal = () => {
  visibleModal.value = true;
};
const handleOk = (e: MouseEvent) => {
  console.log(e);
  visibleModal.value = false;
};


const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const confirm = (e: MouseEvent) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error('Click on No');
};

</script>
<style lang="less" scoped>
.alert {
  .ant-alert {
    margin: 5px;
  }
}
</style>

