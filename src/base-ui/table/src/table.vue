<template>
  <div class="why-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="#"
        align="center"
        width="50"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          v-bind="item"
        >
          <template #default="{ row }">
            <slot :name="item.slotName" :row="row">{{ row[item.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          :hide-on-single-page="true"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    propList: {
      type: Array,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    dataCount: {
      type: Number,
      default: 0
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    title: String,
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (val: any) => {
      emit('selectionChange', val);
    };

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize });
    };

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage });
    };

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>
<style lang="less" scoped>
.why-table {
  .header {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    .title {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .footer {
    padding-top: 12px;
    text-align: right;
  }
}
</style>
