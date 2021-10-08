import whyRequest from '@/service';
import { IDataType } from '@/service/types';

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return whyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  });
}

export function getCategoryGoodsSale() {
  return whyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  });
}

export function getCategoryGoodsFavor() {
  return whyRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  });
}

export function getAddressGoodsSale() {
  return whyRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  });
}
