<template>
  <a-layout-sider :collapsed="isCollapsed" :width="240" theme="light">
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">

      <template v-for="item1 in menu" :key="item1.id">
        <!-- 有二级子菜单 -->
        <a-sub-menu v-if="item1.children" :key="item1.id">
          <template v-if="item1.icon" #icon>
            <component :is="item1.icon" />
          </template>
          <template #title>{{item1.title}}</template>
          <template v-for="item2 in item1.children" :key="item2.id">
            <!-- 有三级子菜单 -->
            <a-sub-menu v-if="item2.children" :key="item2.id" :title="item2.title">
              <a-menu-item v-for="item3 in item2.children" :key="item3.id">
                <router-link :to="item3.path">{{item3.title}}</router-link>
              </a-menu-item>
            </a-sub-menu>
            <!-- 无三级子菜单 -->
            <a-menu-item v-else :key="item2.id">
              <router-link :to="item2.path">{{item2.title}}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <!-- 无二级子菜单 -->
        <a-menu-item v-else :key="item1.id">
          <template v-if="item1.icon" #icon>
            <component :is="item1.icon" />
          </template>
          <router-link :to="item1.path">{{item1.title}}</router-link>
          <!-- <span>{{item1.title}}</span> -->
        </a-menu-item>
      </template>

    </a-menu>
  </a-layout-sider>
</template>


<script lang="ts">
import { reactive, ref, toRefs, computed, onMounted } from "vue";
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
      selectedKeys: [route.meta.id],
      openKeys: []
    });

    onMounted(() => {
      if (route.meta.tagsTree instanceof Array) {
        route.meta.tagsTree.forEach(item => {
          state.openKeys.push(item.id)
        });
      }
    })
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