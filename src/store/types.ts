import { ILoginState } from './login/types';
import { ISystemState } from './main/system/types';
import { IDashboardState } from './main/analysis/types';

export interface IRootState {
  entireDepartment: any[]; // 全部的部门
  entireRole: any[]; // 全部的角色
  entireMenu: any[]; // 全部的菜单
}

export interface IRootWithModule extends IRootState {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboardState;
}

export type IStoreType = IRootState & IRootWithModule;
