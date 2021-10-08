import { useStore } from '@/store';

// 返回用户是否具有此权限
export function usePermission(pageName: string, handleName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  return !!permissions.find((item) => item === verifyPermission);
}
