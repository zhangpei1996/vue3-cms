import axios from 'axios';
import { ElLoading, ILoadingInstance, ElNotification } from 'element-plus';
import type {
  AxiosInstance,
  IWHYRequestConfig,
  IWHYRequestInterceptors
} from './types';

class WHYRequest {
  instance: AxiosInstance;
  interceptors?: IWHYRequestInterceptors;
  showLoading: boolean;
  loading?: ILoadingInstance;

  constructor(config: IWHYRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? true;

    // 从 config 中取出的拦截器时对应实例独有的拦截器
    // 设置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    // 设置响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有实例都有的拦截器，执行顺序
    // 请求拦截器：后添加的先执行
    // 响应拦截器：先添加的先执行
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器: 请求成功拦截');
        // 判断是否需要开启 loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, .5)'
          });
        }
        return config;
      },
      (err) => {
        // console.log('所有实例都有的拦截器: 请求失败拦截');
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器: 响应成功拦截');
        this.loading?.close(); // 移除 loading
        return res.data;
      },
      (err) => {
        // console.log('所有实例都有的拦截器: 响应失败拦截');
        this.loading?.close(); // 移除 loading
        const { response } = err;
        if (response) {
          const { data } = response;
          ElNotification({
            title: '登录失败',
            message: data,
            type: 'error'
          });
        }
        return err;
      }
    );
  }

  request<T>(config: IWHYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 处理接口独有的请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断当前请求是否不需要不需要 loading
      if (config.showLoading === false) {
        this.showLoading = false;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 处理接口独有的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 将 loading 默认置为开启，以免因为一个请求设为关闭而影响后面的请求
          this.showLoading = true;
          resolve(res);
        })
        .catch((err) => {
          // 将 loading 默认置为开启，以免因为一个请求设为关闭而影响后面的请求
          this.showLoading = true;
          reject(err);
        });
    });
  }

  get<T>(config: IWHYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: IWHYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T>(config: IWHYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T>(config: IWHYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default WHYRequest;
