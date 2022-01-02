import { UserType } from '@/types/user.type';
import { getUserFromCookie } from '@/utils/jwt.util';
import { createState } from '@hookstate/core';

const getDefaultUserState = () => {
  const userDataFromSession = getUserFromCookie();

  if (userDataFromSession) return userDataFromSession;

  return null;
};

export const userStore = createState<UserType | null>(getDefaultUserState);
