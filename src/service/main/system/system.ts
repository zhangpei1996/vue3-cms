import whyRequest from '../../index';
import { IDataType } from '../../types';

export function getPageListData(url: string, queryInfo: any) {
  return whyRequest.post<IDataType>({
    url,
    data: queryInfo
  });
}

// url: /xxx/id
export function deletePageData(url: string) {
  return whyRequest.delete<IDataType>({
    url
  });
}

export function createPageData(url: string, newData: any) {
  return whyRequest.post({
    url,
    data: newData
  });
}

export function editPageData(url: string, editData: any) {
  return whyRequest.patch({
    url,
    data: editData
  });
}
