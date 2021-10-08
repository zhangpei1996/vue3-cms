import { IUserMenu } from '@/service/login/types';

export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: IUserMenu[];
  permissions: string[];
}
