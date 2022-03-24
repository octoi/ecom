import { userStore } from '@/state/user.state';
import { removeToken, setToken } from './cookie';

export const setUser = (userData: any) => {
  setToken(userData?.token);
  userStore.set(userData);
};

export const logoutUser = () => {
  removeToken();
  userStore.set(null);

  window.location.reload();
};
