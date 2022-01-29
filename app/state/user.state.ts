import { UserType } from '@/utils/types';
import { getUserFromCookie } from '@/utils/jwt';
import { createState } from '@hookstate/core';

const getDefaultUserState = () => {
  const userDataFromSession = getUserFromCookie();

  if (userDataFromSession) return userDataFromSession;

  return null;
};

export const userStore = createState<UserType | null>(getDefaultUserState);
