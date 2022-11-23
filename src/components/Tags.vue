
<template>
  <div class="my-tags">
    <a-tabs class="my-tabs" v-model:activeKey="activeKey" type="editable-card" hide-add :destroyInactiveTabPane="true"
      :style="{ height: '40px' }">
      <a-tab-pane v-for="item in 20" :key="'tab'+item" :tab="'tab'+item" :closable="true">
      </a-tab-pane>
    </a-tabs>

    <div class="ant-tabs ant-tabs-top ant-tabs-card ant-tabs-editable-card ant-tabs-editable my-tabs" data-v-843c5878=""
      style="height: 40px;">
      <div role="tablist" class="ant-tabs-nav">
        <!---->
        <div ref="tabs" class="ant-tabs-nav-wrap ant-tabs-nav-wrap-ping-right" @wheel.stop="tabsWheel">
          <div ref="tabsList" class="ant-tabs-nav-list">
            <div v-for="item in 40" :key="'tab'+item" class="ant-tabs-tab ant-tabs-tab-with-remove">
              <div role="tab" aria-selected="false" class="ant-tabs-tab-btn" tabindex="0" id="rc-tabs-0-tab-tab1"
                aria-controls="rc-tabs-0-panel-tab1">tab{{item}}</div>
            </div>
            <!--
            <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated" style="left: 1023px; width: 97px;"></div>-->
          </div>
        </div>
        <div class="ant-tabs-nav-operations">
          <!--teleport start-->
          <!--teleport end--><button type="button" class="ant-tabs-nav-more" tabindex="-1" aria-hidden="true"
            aria-haspopup="listbox" aria-controls="rc-tabs-0-more-popup" id="rc-tabs-0-more" aria-expanded="false"
            style=""><span role="img" aria-label="ellipsis" class="anticon anticon-ellipsis"><svg focusable="false"
                class="" data-icon="ellipsis" width="1em" height="1em" fill="currentColor" aria-hidden="true"
                viewBox="64 64 896 896">
                <path
                  d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z">
                </path>
              </svg></span></button>
          <!---->
        </div>
        <!---->
        <!---->
      </div>
    </div>
    <!-- <div class="ivu-tabs-nav">
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
      </div> -->
  </div>

</template>
<script lang="ts">
import { computed, reactive, ref } from "vue";
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


    let translateX = 0;
    let tabs = ref();
    let tabsList = ref();
    const tabsWheel = (e) => {
      console.log(e)
      var deltaX = e.deltaX, deltaY = e.deltaY;
      var absX = Math.abs(deltaX);
      var absY = Math.abs(deltaY);
      if (absX >= absY) {
        translateX = translateX + deltaX;
      } else {
        translateX = translateX + deltaY;
      }
      if (translateX < 0) {
        translateX = 0
      } else if (translateX > (tabsList.value.width - tabs.value.width)) {
        translateX = tabsList.value.width - tabs.value.width
      }
      tabsList.value.style.transform = `translate(${translateX}px, 0px)`
      e.preventDefault();
    }

    return {
      tabs,
      tabsList,
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
}
.my-tabs {
  .ant-tabs-content-holder {
    display: none;
  }
}
</style>