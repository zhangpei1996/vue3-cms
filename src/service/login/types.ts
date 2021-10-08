export interface IAccount {
  name: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

export interface IUserMenu {
  id: number;
  name: string;
  type: number;
  url: string;
  sort: number;
  children: IUserMenu[];
  parentId?: number;
  icon?: string;
  permission?: string;
}
