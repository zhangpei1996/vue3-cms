import { createApp, App } from 'vue';
import RootApp from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css'; // 引入样式重置文件
import '@/styles/index.less';

// 导入插件注册对象
import 'element-plus/dist/index.css';
import registerPlugins from '@/plugins';
import { setupStore } from '@/store';

const app: App = createApp(RootApp);

setupStore();
app.use(store);
app.use(router);
app.use(registerPlugins);
app.mount('#app');

// import whyRequest from '@/service';
// whyRequest.request({
//   url: '/data/data_element_type?normal=nationalStandard',
//   method: 'get',
//   interceptors: {
//     requestInterceptor(config) {
//       console.log('请求独有的请求拦截器');
//       return config;
//     },
//     responsetInterceptor(res) {
//       console.log('响应独有的响应拦截器');
//       return res;
//     }
//   }
// });

// 申明接口返回的数据类型
// 将接口数据类型作为泛型传入进去，达到返回数据检验的目的
// interface DateType {
//   code: number;
//   data: any[];
//   message: string;
// }
// whyRequest
//   .request<DateType>({
//     url: '/data/data_element_type?normal=hospitalStandard',
//     method: 'get'
//     // showLoading: false
//   })
//   .then((res) => {
//     console.log(res);
//   });
// whyRequest
//   .get<DateType>({
//     url: '/data/data_element_type?normal=hospitalStandard'
//   })
//   .then((res) => {
//     console.log(res);
//   });
