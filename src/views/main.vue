
<style lang="less" scoped>
.layout2 {
  height: calc(100vh - 70px);
  background-color: #fff;

  .my-sider {
    overflow-y: auto;
  }
  .my-sider::-webkit-scrollbar {
    width: 0;
  }

  .my-content {
    overflow-y: auto;
  }
  .my-content::-webkit-scrollbar {
    width: 0;
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
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>

  <!-- <Layout class="layout">
    <my-header></my-header>
    <Layout class="ivu-layout-has-sider" :style="{padding: '0'}">
      <my-menu></my-menu>
      <Layout :style="{padding: '0'}">
        <my-tags></my-tags>
        <div :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '0 0 10px 0'}">
            <BreadcrumbItem v-for="item in tagsName" :key="item">{{item}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view v-slot="{ Component }">
              <transition name="move" mode="out-in">
                <keep-alive :include="tagsList">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </Content>
        </div>
      </Layout>
    </Layout>
  </Layout> -->
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
    const tagsName = computed(() =>
      route.meta.tags
    );
    return {
      tagsList,
      tagsName
    }
  },
};
</script>
