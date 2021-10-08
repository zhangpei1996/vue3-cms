<template>
  <div class="base-echarts">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue';
import { EChartsOption } from 'echarts';

import { useEchart } from '../hooks/useEchart';

// withDefaults 用于给 props 写默认值
// defineProps 用于定义 props，不写上可选类型就是必传的
const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    options: EChartsOption;
  }>(),
  {
    width: '100%',
    height: '360px'
  }
);

const echartRef = ref<HTMLElement>();
onMounted(() => {
  const { setOptions } = useEchart(echartRef.value!);
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style lang="less" scoped></style>
