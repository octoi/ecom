import { userStore } from '@/state/user.state';
import { setToken, removeToken } from './jwt';

export const setUser = (userData: any) => {
  setToken(userData?.token);
  userStore.set(userData);
};

export const logoutUser = () => {
  removeToken();
  userStore.set(null);
};
