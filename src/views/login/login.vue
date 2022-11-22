<template>
  <div class="login" @keydown.enter="handleSubmit()">
    <div class="login-bg">
      <div class="login-ctn">
        <a-form ref="loginForm" :model="formData" :rules="loginFormRules" class="login-form" :label-col="{ span: 3 }"
          :wrapper-col="{ span: 21 }">
          <div class="login-logo">
            <img src="../../images/logo.png" alt="系统管理平台" />
          </div>

          <a-form-item label="账号:" name="loginName">
            <a-input v-model:value="formData.loginName" class="input" placeholder="请输入账号" autocomplete="off" />
          </a-form-item>

          <a-form-item label="密码:" name="password">
            <a-input v-model:value="formData.password" type="password" class="input" placeholder="请输入密码"
              autocomplete="off" />
          </a-form-item>

          <a-row class="row-regist">
            <span @click="register()">用户注册</span>
            <span @click="resetPassword()">忘记密码</span>
          </a-row>
          <a-row class="row-button">
            <a-button type="primary" class="button" @click="handleSubmit()">登录</a-button>
          </a-row>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../../stores/counter";

export default {
  name: "DemoLogin",
  setup() {
    // 获取store
    const store = userStore();
    const router = useRouter();
    const loginFormRules: Record<string, Rule[]> = {
      loginName: [{ required: true, message: "不能为空", trigger: "blur" }],
      password: [{ required: true, message: "不能为空", trigger: "blur" }],
    }
    let formData = reactive({
      loginName: "admin",
      password: "123456",
    });

    const register = () => {
      router.push("/register");
    }

    const resetPassword = () => {
      router.push("/resetPassword");
    }

    let loginForm = ref();
    const handleSubmit = () => {
      if (loginForm) {
        loginForm.value.validate().then(() => {
          store.setLoginUser(formData.loginName);
          sessionStorage.setItem('token', formData.loginName);
          store.loadMenu();
          router.push("/home");
        }).catch(msg => { });
      }
    }

    return {
      loginForm,
      formData,
      loginFormRules,
      register,
      resetPassword,
      handleSubmit
    };
  },
};
</script>
<style lang="less" scoped>
@import './login.less';
</style>