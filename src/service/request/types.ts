import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义拦截器类型
interface IWHYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
// 定义一个新接口，在原有接口的基础上扩展拦截器属性
interface IWHYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IWHYRequestInterceptors<T>;
  showLoading?: boolean;
}

export {
  AxiosInstance,
  AxiosRequestConfig,
  IWHYRequestInterceptors,
  IWHYRequestConfig,
  AxiosResponse
};
