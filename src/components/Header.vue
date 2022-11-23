<template>
  <a-layout-header class="header">
    <a-row>
      <a-col span="6" class="header-title">        
        <component @click="collapsedSider" :is="isCollapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'" />
        <span>后台管理系统</span>
      </a-col>

      <a-col span="18" class="header-menu">
        <component @click="toggleFullscreen" :is="isScreenfull ? 'fullscreen-exit-outlined' : 'fullscreen-outlined'" />

        <div class="btn-bell">
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{message ? `有${message}条未读消息` : `消息中心`}}</span>
            </template>
            <bell-outlined />
          </a-tooltip>

          <span class="btn-bell-badge" v-if="message"></span>
        </div>

        <div class="header-user">
          <img class="header-photo" src="../images/tx.jpg">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              {{username}}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu @click="onClick">
                <a-menu-item key="1" @click="goGit">仓库地址</a-menu-item>
                <a-menu-item key="2">修改密码</a-menu-item>
                <a-menu-item key="3" @click="signOut">退出</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userStore } from "../stores/counter";
import screenfull from "screenfull";

export default {
  setup() {
    // 获取store
    const store = userStore();
    const router = useRouter();
    let isCollapsed = computed(() => store.meunIsCollapsed);
    let username = computed(() => store.loginUser);
    let isScreenfull = ref(false);
    let message = ref(2);

    // 侧边栏折叠
    const collapsedSider = () => {
      store.setMeunIsCollapsed(!isCollapsed.value);
    }

    const goGit = () => {
      window.open("https://gitee.com/huanglgln/vue-sys-manage-adv")
    }

    const signOut = () => {
      store.setLoginUser("");
      sessionStorage.removeItem('token');
      router.push("/login");
    }

    const toggleFullscreen = () => {
      //判断是否支持全屏
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }

    screenfull.onchange(() => {
      isScreenfull.value = !isScreenfull.value;
    });

    return {
      message,
      username,
      isCollapsed,
      isScreenfull,
      collapsedSider,
      signOut,
      toggleFullscreen,
      goGit
    };
  },
};
</script>
<style lang="less" scoped>
.header {
  padding: 0;
  height: 70px;
}

.header-title {
  font-size: 22px;
  color: #fff;
  display: flex;
  align-items: center;
  line-height: 70px;
  height: 70px;

  .anticon {
    margin: 0 20px;
    font-size: 24px;
  }
}

.header-menu {
  display: flex;
  justify-content: right;
  color: #fff;
  align-items: center;

  > .anticon {
    margin: 0 10px;
    cursor: pointer;
    font-size: 24px;
    line-height: 24px;
  }

  .btn-bell {
    margin-right: 5px;
    position: relative;
    text-align: center;
    width: 24px;
    height: 24px;
    cursor: pointer;

    .anticon {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24px;
    }

    .btn-bell-badge {
      position: absolute;
      right: 0;
      top: -2px;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: #f56c6c;
      color: #fff;
    }
  }

  .header-photo {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  > .header-user {
    margin: 0 10px;
    height: 60px;
    display: flex;
    align-items: center;
    > img {
      margin-right: 10px;
    }
    :deep(i) {
      margin: 0;
    }
  }
}
</style>
