<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        size="medium"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
      <span>
        {{ name }}
      </span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
        <el-dropdown-item divided>用户信息</el-dropdown-item>
        <el-dropdown-item>系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { IRootWithModule } from '@/store/types';
import localCache from '@/utils/cache';

export default defineComponent({
  setup() {
    const store = useStore<IRootWithModule>();
    const name = computed(() => store.state.login.userInfo.name);

    const router = useRouter();
    const handleExitClick = () => {
      localCache.deleteCache('token');
      router.push('/');
    };

    return { name, handleExitClick };
  }
});
</script>
<style lang="less" scoped>
.el-dropdown {
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    .el-avatar {
      margin-right: 8px;
    }
  }
}
</style>
