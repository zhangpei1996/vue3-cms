// service 统一出口
import WHYRequest from './request';
import localCache from '@/utils/cache';

const whyRequest = new WHYRequest({
  baseURL: 'http://152.136.185.210:5000',
  interceptors: {
    requestInterceptor(config) {
      // console.log('请求拦截器');
      const token = localCache.getCache('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    responseInterceptor(res) {
      // console.log('响应拦截器');
      return res;
    }
  }
});
export default whyRequest;

// 多个请求地址可以导出多个实例
export const whyRequest2 = new WHYRequest({
  baseURL: ''
});
