
<style lang="less" scoped>
.layout2 {
  height: calc(100vh - 70px);
  // background-color: #fff;

  .my-sider {
    overflow-y: auto;
  }
  .my-sider::-webkit-scrollbar {
    width: 0;
  }

  .my-content {
    height: calc(100vh - 70px);

    .my-page {
      overflow-y: auto;
      height: calc(100vh - 115px);
      padding: 10px 20px;

      .my-breadcrumb {
        padding: 0 0 10px 0;
      }
    }

    .my-page::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
<template>
  <a-layout>
    <my-header></my-header>
    <a-layout class="layout2">
      <my-sider class="my-sider"></my-sider>
      <a-layout-content class="my-content">
        <my-tags></my-tags>
        <div class="my-page">
          <a-breadcrumb class="my-breadcrumb">
            <a-breadcrumb-item v-for='(item, index) in tagsTree' :key="index">
              <component v-if="item.icon" :is="item.icon" />
              {{item.title}}
            </a-breadcrumb-item>
          </a-breadcrumb>
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <keep-alive :include="tagsList">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import myHeader from "../components/Header.vue";
import mySider from "../components/Sider.vue";
import myTags from "../components/Tags.vue";
import { computed } from "vue";
import { userStore } from "../stores/counter";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "MainPage",
  components: {
    myHeader,
    mySider,
    myTags,
  },
  setup() {
    const route = useRoute();
    const store = userStore();
    const tagsList = computed(() =>
      store.tagsList.map((item) => item.name)
    );

    const tagsTree = computed(() => route.meta.tagsTree);
    return {
      tagsList,
      tagsTree
    };
  },
};
</script>
