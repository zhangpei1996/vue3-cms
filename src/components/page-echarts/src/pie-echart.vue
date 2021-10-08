<template>
  <div>
    <echart :options="options"></echart>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import Echart from '@/base-ui/echart';
import { IDataType } from './types';

const props = defineProps<{
  pieData: IDataType[];
}>();

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
});
</script>
