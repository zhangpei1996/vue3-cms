<template>
  <div class="login-account">
    <el-form
      :model="account"
      status-icon
      :rules="rules"
      label-width="50px"
      class="demo-ruleForm"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          show-password
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { rules } from '../config/account-config';
import { ElForm } from 'element-plus';
import localCache from '@/utils/cache';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    // 用户名密码
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    });

    // InstanceType 获取构造函数类型的返回类型
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1. 判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name);
            localCache.setCache('password', account.password);
          } else {
            localCache.deleteCache('name');
            localCache.deleteCache('password');
          }

          // 2. 开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account });
        } else {
          return false;
        }
      });
    };

    return {
      account,
      rules,
      formRef,
      loginAction
    };
  }
});
</script>
