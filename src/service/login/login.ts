import request from '../index';
import { IAccount, ILoginResult, IUserMenu } from './types';
import { IDataType } from '../types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' // role/:id/menu
}

// 登录接口
export function accountLogin(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

// 获取登录用户信息接口(可以做个取舍，复杂的类型可以酌情考虑使用any)
export function requestUserInfoById(id: number) {
  return request.get<any>({
    url: `${LoginAPI.LoginUserInfo}${id}`,
    showLoading: false
  });
}

// 用户菜单
export function requestUserMenusByRoleId(id: number) {
  return request.get<IDataType<IUserMenu[]>>({
    url: `${LoginAPI.UserMenus}${id}/menu`,
    showLoading: false
  });
}
