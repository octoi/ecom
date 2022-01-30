import { userStore } from '@/state/user.state';
import { setToken, removeToken } from './jwt';

export const setUser = (userData: any) => {
  setToken(userData?.token);
  userStore.set(userData);
};

export const logoutUser = () => {
  const permission = window.confirm('Are you sure ?');
  if (!permission) return;

  removeToken();
  userStore.set(null);
};
