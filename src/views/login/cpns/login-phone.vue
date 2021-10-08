<template>
  <div class="login-phone">
    <el-form
      :model="phone"
      status-icon
      ref="ruleForm"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号">
        <el-input type="text" v-model="phone.num" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input
            type="text"
            v-model="phone.verifyCode"
            autocomplete="off"
          ></el-input>
          <el-button class="get-code" type="primary" size="mini"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      verifyCode: ''
    });

    const loginAction = () => {
      console.log('phone 登录逻辑');
    };
    return {
      phone,
      loginAction
    };
  }
});
</script>
<style lang="less">
.login-phone {
  .verify-code {
    display: flex;
    .get-code {
      margin-left: 12px;
    }
  }
}
</style>
