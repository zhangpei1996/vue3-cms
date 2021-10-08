<template>
  <div class="page-content">
    <why-table
      :dataList="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          size="mini"
          icon=""
          type="primary"
          @click="handleNewClick"
          >新建</el-button
        >
      </template>
      <!-- 列中的插槽 -->
      <template #createAt="{ row }">
        <div>{{ $filters.formatTime(row.createAt) }}</div>
      </template>
      <template #updateAt="{ row }">
        <div>{{ $filters.formatTime(row.updateAt) }}</div>
      </template>
      <template #handler="{ row }">
        <el-button
          v-if="isUpdate"
          type="text"
          size="mini"
          icon="el-icon-edit"
          @click="handleEditClick(row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          type="text"
          size="mini"
          icon="el-icon-delete"
          style="color: #f56c6c"
          @click="handleDeleteClick(row)"
          >删除</el-button
        >
      </template>

      <!-- 在 page-content 中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="{ row }"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="row"></slot>
        </template>
      </template>
    </why-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import WhyTable from '@/base-ui/table';
import { usePermission } from '@/hooks/usePermission';

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    WhyTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore();

    // 获取操作权限
    const isCreate = usePermission(props.pageName, 'create');
    const isUpdate = usePermission(props.pageName, 'update');
    const isDelete = usePermission(props.pageName, 'delete');
    const isQuery = usePermission(props.pageName, 'query');

    // 1.双向绑定 pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}, resetPageNum = false) => {
      if (!isQuery) return;
      if (resetPageNum) pageInfo.value.currentPage = 1;
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();

    // 3.从vuex中获取网络请求返回的数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    );

    // 4.获取其它的的动态插槽名称
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        return !['createAt', 'updateAt', 'handler'].includes(item.slotName);
      }
    );

    // 5.删除、编辑、新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      });
    };
    const handleNewClick = () => {
      emit('newBtnClick');
    };
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item);
    };

    return {
      isCreate,
      isUpdate,
      isDelete,
      pageInfo,
      dataList,
      dataCount,
      otherPropSlots,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    };
  }
});
</script>
<style lang="less" scoped>
.page-content {
  padding: 12px;
}
</style>
