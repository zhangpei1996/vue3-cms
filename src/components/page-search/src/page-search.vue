<template>
  <div class="page-search">
    <why-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <el-button
          @click="handleResetClick"
          size="mini"
          icon="el-icon-refresh-left"
          >重置</el-button
        >
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="handleQueryClick"
          >搜索</el-button
        >
      </template>
    </why-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import WhyForm, { IForm } from '@/base-ui/form';

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true
    }
  },
  components: {
    WhyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 取出配置文件中传入的查询字段
    const formItems = props.searchFormConfig.formItems;
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = '';
    }
    const formData = ref(formOriginData);

    // 重置查询参数
    const handleResetClick = () => {
      for (const key in formData.value) {
        formData.value[key] = '';
      }
      emit('resetBtnClick');
    };

    // 搜索按钮点击事件
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value);
    };
    return {
      formData,
      handleResetClick,
      handleQueryClick
    };
  }
});
</script>
<style lang="less">
.page-search {
  .footer {
    text-align: right;
    padding: 0 20px 12px 0;
  }
}
</style>
