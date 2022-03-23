import { userStore } from '@/state/user.state';
import { removeToken, setToken } from './cookie';

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
