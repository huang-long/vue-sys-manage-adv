
<script lang="ts">
import { computed, reactive } from "vue";
import { userStore } from "../stores/counter";
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    // 获取store
    const store = userStore();
    let tagsList = computed(() => store.tagsList);

    const isActive = (path: string) => {
      return path === route.fullPath;
    };

    // 关闭单个标签
    const closeTags = (index: number) => {
      const delItem = tagsList.value[index];
      store.delTagsItem(index);
      const item = tagsList.value[index]
        ? tagsList.value[index]
        : tagsList.value[index - 1];
      if (item) {
        delItem.path === route.fullPath && router.push(item.path);
      } else {
        router.push("/home");
      }
    };

    // 设置标签
    const setTags = (route: RouteLocationNormalizedLoaded) => {
      const isExist = tagsList.value.some((item) => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (tagsList.value.length >= 8) {
          store.delTagsItem(0);
        }
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

    return {
      tagsList,
      isActive,
      closeTags,
      closeAll,
      closeOther,
      goPage
    }
  },
};
</script>

<template>
  <div class="tabs">
    <div class="ivu-bb">
      <div class="ivu-tabs-nav">
        <div v-for="(item,index) in tagsList" :class="{'ivu-tabs-tab':true, 'ivu-tabs-tab-active': isActive(item.path)}"
          :key="index">
          <span @click="goPage(item.path)">{{item.title}}</span>
          <Icon type="ios-close" size="22" @click="closeTags(index)" />
        </div>
      </div>

      <div class="tags-right">
        <Dropdown>
          <span style="cursor:pointer;">
            标签选项
            <Icon type="md-arrow-dropdown" size="20" />
          </span>
          <template #list>
            <DropdownMenu>
              <DropdownItem @click="closeOther">关闭其他</DropdownItem>
              <DropdownItem @click="closeAll">关闭所有</DropdownItem>
            </DropdownMenu>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
.tabs {
  width: 100%;
}

.ivu-bb {
  width: 100%;
  padding: 2px 0;
  height: 34px;
  background-color: #fff;
  margin: 0 0 10px 0;

  .ivu-tabs-nav {
    padding: 0 10px;
    width: ~'calc(100% - 110px)';
    height: 32px;
    overflow: hidden;

    .ivu-tabs-tab {
      margin: 0;
      margin-right: 4px;
      height: 31px;
      padding: 5px 16px 4px;
      border: 1px solid #dcdee2;
      border-bottom: 0;
      border-radius: 4px 4px 0 0;
      background: #f8f8f9;
      white-space: nowrap;

      :deep(i) {
        width: 0;
        margin: 0 -6px 0 0;
        height: 22px;
        vertical-align: middle;
        overflow: hidden;
        position: relative;
        top: -1px;
        transform-origin: 100% 50%;
        transition: all 0.3s ease-in-out;
      }
    }

    .ivu-tabs-tab-active {
      height: 32px;
      background: #fff;

      :deep(i) {
        width: 22px;
      }
    }

    .ivu-tabs-tab:hover {
      :deep(i) {
        width: 22px;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }
    }
  }

  .tags-right {
    padding: 0 10px;
    float: right;
    line-height: 30px;
  }
}
</style>