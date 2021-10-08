import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import localCache from '@/utils/cache';
import { firstPath } from '@/utils/map-menus';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/views/404.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) router.push({ path: '/login', query: { redirect: to.path } });
  }

  if (to.path === '/main') {
    if (firstPath) router.push(firstPath);
  }
});

export default router;
