<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      pageName="role"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, nextTick } from 'vue';
import { useStore } from '@/store';
import { ElTree } from 'element-plus';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageModal } from '@/hooks/usePageModal';
import { getMenuLeafKeys } from '@/utils/map-menus';

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  name: 'role',
  setup() {
    const otherInfo = ref<{ menuList: any[] }>({ menuList: [] });
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const newCallback = () => {
      modalConfig.title = '新建角色';
    };
    const editCallback = (item: any) => {
      modalConfig.title = '编辑角色';
      const leafKeys: number[] = getMenuLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback);

    const store = useStore();
    const menus = computed(() => {
      return store.state.entireMenu;
    });

    const handleCheckChange = (data1: any, data2: any) => {
      const { checkedKeys, halfCheckedKeys } = data2;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value.menuList = menuList;
    };

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      elTreeRef,
      menus,
      otherInfo,
      handleCheckChange,
      handleNewData,
      handleEditData
    };
  }
});
</script>

<style scoped lang="less">
.role {
  .el-tree {
    margin-left: 12px;
  }
}
</style>
