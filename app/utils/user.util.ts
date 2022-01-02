import { userStore } from '@/states/user.state';
import { setToken, removeToken } from './jwt.util';

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

export const getUserAvatar = (name: string): string => {
  return encodeURI(`https://avatars.dicebear.com/api/initials/${name}.svg`);
};
