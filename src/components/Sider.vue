<template>
  <a-layout-sider :collapsed="isCollapsed" :width="240" theme="light">
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
      <template v-for="item1 in menu" :key="item1.id + '_1'">
        <!-- 有二级子菜单 -->
        <a-sub-menu v-if="item1.children" :key="item1.id">
          <template v-if="item1.icon" #icon>
            <component :is="item1.icon" />
          </template>
          <template #title>{{ item1.title }}</template>
          <template v-for="item2 in item1.children" :key="item2.id + '_21'">
            <!-- 有三级子菜单 -->
            <a-sub-menu v-if="item2.children" :key="item2.id + '_22'" :title="item2.title">
              <a-menu-item v-for="item3 in item2.children" :key="item3.id">
                <router-link v-if="item3.path" :to="item3.path">{{ item3.title }}</router-link>
              </a-menu-item>
            </a-sub-menu>
            <!-- 无三级子菜单 -->
            <a-menu-item v-else :key="item2.id + '_23'">
              <router-link v-if="item2.path" :to="item2.path">{{ item2.title }}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <!-- 无二级子菜单 -->
        <a-menu-item v-else :key="item1.id + '_'">
          <template v-if="item1.icon" #icon>
            <component :is="item1.icon" />
          </template>
          <router-link v-if="item1.path" :to="item1.path">{{ item1.title }}</router-link>
          <!-- <span>{{item1.title}}</span> -->
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { reactive, ref, toRefs, computed, onMounted, watch } from "vue";
import { userStore } from "../stores/counter";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    // 获取store
    const store = userStore();
    const menu = computed(() => store.menuList);
    const isCollapsed = computed(() => store.meunIsCollapsed);
    const sideMenu = ref();

    const state = reactive({
      selectedKeys: [route.meta.id],
      openKeys: [""],
    });

    watch(
      () => route.fullPath,
      () => {
        const tagsTree = route.meta.tagsTree;
        state.openKeys = [];
        if (tagsTree instanceof Array) {
          tagsTree.forEach((item) => {
            item.id && state.openKeys.push(item.id);
          });
        }
        state.selectedKeys = [route.meta.id];
      }
    );
    onMounted(() => {
      const tagsTree = route.meta.tagsTree;
      state.openKeys = [];
      if (tagsTree instanceof Array) {
        tagsTree.forEach((item) => {
          item.id && state.openKeys.push(item.id);
        });
      }
    });
    return {
      ...toRefs(state),
      isCollapsed,
      sideMenu,
      menu,
    };
  },
};
</script>

<style lang="less" scoped></style>
