import { createStore, useStore as vuexUseStore } from 'vuex';
import { IRootState, IRootWithModule } from './types';
import login from './login/login';
import system from './main/system/system';
import dashboard from './main/analysis/dashboard';
import { getPageListData } from '@/service/main/system/system';

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求全局数据(部门、角色、菜单)
      const {
        data: { list: departmentList }
      } = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      });
      const {
        data: { list: roleList }
      } = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      });
      const {
        data: { list: menuList }
      } = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      });

      // 保存数据
      commit('changeEntireDepartment', departmentList);
      commit('changeEntireRole', roleList);
      commit('changeEntireMenu', menuList);
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
});

// 初始化 store 解决页面刷新后 Vuex 缓存数据丢失的问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

export function useStore() {
  return vuexUseStore<IRootWithModule>();
}

export default store;
