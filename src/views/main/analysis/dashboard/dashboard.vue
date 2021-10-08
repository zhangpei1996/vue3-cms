<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量（饼图）">
          <pie-chart :pieData="categoryGoodsCount"></pie-chart>
        </card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市商品销量">
          <map-chart :mapData="addressGoodsSale"></map-chart>
        </card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量(玫瑰图)">
          <rose-chart :roseData="categoryGoodsCount"></rose-chart>
        </card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <card title="分类商品销量">
          <line-chart v-bind="categoryGoodsSale"></line-chart>
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品收藏">
          <bar-chart v-bind="categoryGoodsFavor"></bar-chart>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

import Card from '@/base-ui/card';
import {
  PieChart,
  RoseChart,
  LineChart,
  BarChart,
  MapChart
} from '@/components/page-echarts';

export default defineComponent({
  name: 'dashboard',
  components: {
    Card,
    PieChart,
    RoseChart,
    LineChart,
    BarChart,
    MapChart
  },
  setup() {
    const store = useStore();
    store.dispatch('dashboard/getDashboardDataAction');

    const categoryGoodsCount = computed(() =>
      store.state.dashboard.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount };
      })
    );

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const values: any[] = [];
      store.state.dashboard.categoryGoodsSale.forEach((item) => {
        xLabels.push(item.name);
        values.push(item.goodsCount);
      });
      return {
        xLabels,
        values
      };
    });

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = [];
      const values: any[] = [];
      store.state.dashboard.categoryGoodsFavor.forEach((item: any) => {
        xLabels.push(item.name);
        values.push(item.goodsFavor);
      });
      return { xLabels, values };
    });

    const addressGoodsSale = computed(() =>
      store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count };
      })
    );

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    };
  }
});
</script>

<style scoped>
.content-row {
  margin-top: 10px;
}
</style>
