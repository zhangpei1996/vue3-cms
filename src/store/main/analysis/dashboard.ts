import { Module } from 'vuex';
import { IRootState } from '../../types';
import { IDashboardState } from './types';

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard';

const dashboardMoudle: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeCddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const { data: categoryGoodsCount } = await getCategoryGoodsCount();
      const { data: categoryGoodsSale } = await getCategoryGoodsSale();
      const { data: categoryGoodsFavor } = await getCategoryGoodsFavor();
      const { data: addressGoodsSale } = await getAddressGoodsSale();

      commit('changeCategoryGoodsCount', categoryGoodsCount);
      commit('changeCategoryGoodsSale', categoryGoodsSale);
      commit('changeCategoryGoodsFavor', categoryGoodsFavor);
      commit('changeCddressGoodsSale', addressGoodsSale);
    }
  }
};

export default dashboardMoudle;
