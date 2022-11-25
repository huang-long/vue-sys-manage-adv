
<template>
  <div v-if="tagsList && tagsList.length !== 0" class="my-tags">
    <div class="ant-tabs ant-tabs-top ant-tabs-card ant-tabs-editable-card ant-tabs-editable" style="height: 40px;">
      <div class="ant-tabs-nav">
        <div ref="tabs" @wheel.stop="tabsWheel"
          :class="{'ant-tabs-nav-wrap':true, 'ant-tabs-nav-wrap-ping-left': tabsClass[0], 'ant-tabs-nav-wrap-ping-right': tabsClass[1]}">
          <div ref="tabsList" class="ant-tabs-nav-list">
            <div v-for="(item, index)  in tagsList" :key="index"
              :class="{'ant-tabs-tab':true, 'ant-tabs-tab-active':isActive(item.path)}">
              <div class="ant-tabs-tab-btn">
                <span @click="goPage(item.path)">{{item.title}}</span>
                <button type="button" class="ant-tabs-tab-remove" @click="closeTags(index)">
                  <close-outlined />
                </button>
              </div>
            </div>
            <!-- <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated" style="left: 1023px; width: 97px;"></div> -->
          </div>
        </div>
        <div class="ant-tabs-nav-operations">
          <a-dropdown>
            <button type="button" class="ant-tabs-nav-more">
              <ellipsis-outlined />
            </button>
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
    </div>
  </div>
</template>
<script lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
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

    let activeKey = ref('tab1');
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

    //滚轮滑动操作
    let translateX = 0;
    let tabs = ref();
    let tabsList = ref();
    let tabsClass = ref([false, false]);
    onMounted(() => {
      let max = tabs.value.offsetWidth - tabsList.value.offsetWidth
      if (max < 0) {
        tabsClass.value = [false, false]
      }
    })
    const tabsWheel = (e: WheelEvent) => {
      translateX = translateX - e.deltaY;
      let max = tabs.value.offsetWidth - tabsList.value.offsetWidth
      if (max >= 0) {
        tabsClass.value = [false, false]
        return
      }

      if (translateX > 0) {
        translateX = 0
        tabsClass.value = [false, true]
      } else if (translateX < max) {
        tabsClass.value = [true, false]
        translateX = max
      } else {
        tabsClass.value = [true, true]
      }
      tabsList.value.style.transform = `translate(${translateX}px, 0px)`
      e.preventDefault();
    }

    return {
      tabs,
      tabsList,
      tabsClass,
      activeKey,
      tagsList,
      tabsWheel,
      isActive,
      closeTags,
      closeAll,
      closeOther,
      goPage
    }
  },
};
</script>
<style lang="less" scoped>
.my-tags {
  width: 100%;
  padding: 5px 10px 0 10px;
  background-color: #fff;
}

// .ant-tabs-tab {
//   .ant-tabs-tab-remove {
//     display: none;
//   }
// }

// .ant-tabs-tab.ant-tabs-tab-active {
//   .ant-tabs-tab-remove {
//     display: inline-block;
//   }
// }

// .ant-tabs-tab:hover {
//   .ant-tabs-tab-remove {
//     display: inline-block;
//   }
// }
</style>