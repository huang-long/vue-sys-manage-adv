

<template>
  <a-layout-sider :collapsed="isCollapsed" :width="240">
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">

      <!-- <template v-for="item1 in menu" :key="item1.name">
        <a-menu-item v-if="item1.children" :key="item1.name">
          <template v-if="item1.icon" #icon>
            <component :is="item1.icon" />
          </template>
          <span>{{item1.title}}</span>
        </a-menu-item>
        <a-menu-item v-else :key="item1.name">
          <template v-if="item1.icon" #icon>
            <component :is="item1.icon" />
          </template>
          <span>{{item1.title}}</span>
        </a-menu-item>
      </template> -->

      <component v-for="item1 in menu" :key="item1.name" :is="item1.children?'a-sub-menu':'a-menu-item'">
        <template v-if="item1.icon" #icon>
          <component :is="item1.icon" />
        </template>
        <span>{{item1.title}}</span>
        <template v-if="item1.children">
          <component v-for="item2 in item1.children" :key="item2.name" :is="item2.children?'a-sub-menu':'a-menu-item'">
            <template v-if="item2.icon" #icon>
              <component :is="item2.icon" />
            </template>
            <span>{{item2.title}}</span>
            <!-- <template v-if="item2.children">
              <component v-for="item3 in item2.children" :key="item3.name"
                :is="item3.children?'a-sub-menu':'a-menu-item'">
                <template v-if="item3.icon" #icon>
                  <component :is="item3.icon" />
                </template>
                <span>{{item3.title}}</span>
              </component>
            </template> -->
          </component>
        </template>
      </component>

      <!-- <a-menu-item v-for="item1 in menu" :key="item1.name">
        <template v-if="item1.icon" #icon>
          <component :is="item1.icon" />
        </template>
        <span>{{item1.title}}</span>
      </a-menu-item> -->

      <!-- <a-menu-item key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Two</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu> -->
    </a-menu>
  </a-layout-sider>
</template>


<script lang="ts">
import { reactive, ref, toRefs, computed, watch } from "vue";
import { userStore } from "../stores/counter";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 获取store
    const store = userStore();
    let menu = computed(() => store.menuList);
    let isCollapsed = computed(() => store.meunIsCollapsed);
    let sideMenu = ref();
    const state = reactive({
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    });

    watch(
      () => state.openKeys,
      (_val, oldVal) => {
        state.preOpenKeys = oldVal;
      },
    );

    return {
      ...toRefs(state),
      isCollapsed,
      sideMenu,
      menu
    };
  },
};
</script>

<style lang="less" scoped>
</style>