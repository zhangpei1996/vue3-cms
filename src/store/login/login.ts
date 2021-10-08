import { Module } from 'vuex';
import { ILoginState } from './types';
import { IRootState } from '../types';
import {
  accountLogin,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login';
import { IAccount, IUserMenu } from '@/service/login/types';
import localCache from '@/utils/cache';
import router from '@/router';
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus';

// Module 需要传入两个泛型，第一个是本模块 state 的类型，第二个是根模块 state 的类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: IUserMenu[]) {
      state.userMenus = userMenus;

      // 将 userMenus 映射到 routes 中
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => router.addRoute('main', route));

      // 获取用户具有的权限
      const permissions = mapMenusToPermission(userMenus);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1. 实现登陆逻辑
      const {
        data: { id, token }
      } = await accountLogin(payload);
      commit('changeToken', token);
      localCache.setCache('token', token);

      // 发送初始化请求(获取完整的role/department)
      dispatch('getInitialDataAction', null, { root: true });

      // 2. 请求用户信息
      const { data: userInfo } = await requestUserInfoById(id);
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      // 3. 请求用户菜单
      const { data: userMenus } = await requestUserMenusByRoleId(userInfo.id);
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      // 4. 重定向或跳转到首页
      const { currentRoute } = router;
      const {
        query: { redirect }
      } = currentRoute.value;
      if (redirect && typeof redirect === 'string') {
        router.push(redirect);
      } else {
        router.push('/main');
      }
    },
    loadLocalLogin({ commit, dispatch }) {
      // 页面刷新后读取本地缓存的数据放入 store 中
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
      } else {
        return;
      }
      // 发送初始化请求(获取完整的role/department)
      dispatch('getInitialDataAction', null, { root: true });

      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
