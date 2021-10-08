import { Module } from 'vuex';
import { IRootState } from '../../types';
import { ISystemState } from './types';
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system';

const pageUrlMap: { [key: string]: string } = {
  users: '/users/list',
  role: '/role/list',
  goods: '/goods/list',
  menu: '/menu/list'
};

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      queryInfo: {}
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeUsersList(state, usersList) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount) {
      state.menuCount = menuCount;
    },
    changeQueryInfo(state, queryInfo) {
      state.queryInfo = queryInfo;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const { pageName, queryInfo } = payload;
      const pageUrl: string = pageUrlMap[pageName];

      const {
        data: { list, totalCount }
      } = await getPageListData(pageUrl, queryInfo);

      switch (pageName) {
        case 'users':
          commit('changeUsersList', list);
          commit('changeUsersCount', totalCount);
          break;
        case 'role':
          commit('changeRoleList', list);
          commit('changeRoleCount', totalCount);
          break;
        case 'goods':
          commit('changeGoodsList', list);
          commit('changeGoodsCount', totalCount);
          break;
        case 'menu':
          commit('changeMenuList', list);
          commit('changeMenuCount', totalCount);
          break;
      }
      commit('changeQueryInfo', queryInfo);
    },
    async deletePageDataAction({ dispatch, state }, payload: any) {
      // 1.获取 pageName 和 id 组成 url
      const { pageName, id } = payload;
      const pageUrl = `${pageName}/${id}`;
      // 2.发送网络请求
      await deletePageData(pageUrl);
      // 3.重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.queryInfo
      });
    },
    async createPageDataAction({ dispatch, state }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.queryInfo
      });
    },
    async editPageDataAction({ dispatch, state }, payload: any) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.queryInfo
      });
    }
  }
};

export default systemModule;
