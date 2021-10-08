<template>
  <div class="nav-header">
    <i
      @click="handleFoldClick"
      :class="['fold-menu', isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      :title="isFold ? '展开菜单' : '折叠菜单'"
    ></i>
    <breadcrumb class="breadcrumb" :breadcrumbs="breadcrumbs" />
    <user-info class="user-info" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import UserInfo from './user-info.vue';
import Breadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb';
import { useStore } from 'vuex';
import { IRootWithModule } from '@/store/types';
import { useRoute } from 'vue-router';
import { pathMapBreadcrumbs } from '@/utils/map-menus';

export default defineComponent({
  props: {
    isFold: {
      type: Boolean,
      default: false
    }
  },
  emits: ['foldChange'],
  components: {
    UserInfo,
    Breadcrumb
  },
  setup(props, { emit }) {
    // 是否折叠菜单
    const handleFoldClick = () => {
      emit('foldChange', !props.isFold);
    };

    // 获取面包屑需要的路径
    const breadcrumbs = computed(() => {
      const store = useStore<IRootWithModule>();
      const route = useRoute();
      const userMenus = computed(() => store.state.login.userMenus);
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus.value, currentPath);
    });

    return {
      breadcrumbs,
      handleFoldClick
    };
  }
});
</script>
<style lang="less">
.nav-header {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .breadcrumb {
    margin-left: 12px;
  }
  .user-info {
    position: absolute;
    right: 0;
  }
}
</style>
