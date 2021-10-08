export interface ISystemState {
  [key: string]: any; // 给接口的所有成员设置索引签名
  usersList: any[];
  usersCount: number;
  roleList: any[];
  roleCount: number;
  goodsList: any[];
  goodsCount: number;
  menuList: any[];
  menuCount: number;
  queryInfo: any;
}
