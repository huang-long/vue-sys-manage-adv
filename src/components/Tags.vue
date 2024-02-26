<template>
  <div v-if="tagsList && tagsList.length !== 0" class="my-tags">
    <div class="menu-tabs">
      <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @change="goPage" @edit="closeTags">
        <a-tab-pane v-for="item in tagsList" :key="item.path" :tab="item.title" :closable="true"></a-tab-pane>
      </a-tabs>
    </div>

    <div class="menu-tabs-operations">
      <a-dropdown>
        <a-button type="link" class="menu-tabs-more">
          <ellipsis-outlined />
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="closeOther">关闭其他</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="closeAll">关闭所有</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup name="CompTags">
import { computed } from "vue";
import { userStore } from "../stores/counter";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
// 获取store
const store = userStore();
const tagsList = computed(() => store.tagsList);

const activeKey = computed(() => route.fullPath);
// 关闭单个标签 (action === 'add' ? event : targetKey, action): void
const closeTags = (targetKey: string, action: string) => {
  console.log(action);
  if (action === "remove") {
    const index = tagsList.value.findIndex((item) => item.path === targetKey);
    const delItem = tagsList.value[index];
    store.delTagsItem(index);
    const item = tagsList.value[index] ? tagsList.value[index] : tagsList.value[index - 1];
    if (item) {
      delItem.path === route.fullPath && router.push(item.path);
    } else {
      router.push("/home");
    }
  }
};

// 设置标签
const setTags = (route: RouteLocationNormalizedLoaded) => {
  const isExist = tagsList.value.some((item) => {
    return item.path === route.fullPath;
  });
  if (!isExist) {
    // if (tagsList.value.length >= 8) {
    //   store.delTagsItem(0);
    // }
    store.addTagsItem({
      name: route.name as string,
      title: route.meta.title as string,
      path: route.fullPath,
    });
  }
};
setTags(route);
onBeforeRouteUpdate((to) => {
  setTags(to);
});

// 关闭全部标签
const closeAll = () => {
  store.clearAllTags();
  router.push("/home");
};

// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item) => {
    return item.path === route.fullPath;
  });
  store.closeTagsOther(curItem);
};

//页面跳转
const goPage = (path: string) => {
  router.push(path);
};
</script>
<style lang="less" scoped>
.my-tags {
  width: 100%;
  padding: 5px 10px 0 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;

  .menu-tabs {
    min-width: 500px;

    :deep(.ant-tabs-nav) {
      margin: 0;
    }

    :deep(.ant-tabs-nav-operations) {
      display: none;
    }
  }

  .menu-tabs-operations {
    width: 30px;
    padding: 5px 5px 0 0;

    .menu-tabs-more {
      width: 30px;
      height: 30px;
      text-align: center;
    }
  }
}
</style>
