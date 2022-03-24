import React from 'react';
import { userStore } from '@/state/user.state';
import { GuestUser } from './GuestUser';
import { LoggedInUser } from './LoggedInUser';

export const MenuButton = () => {
  const user = userStore.get();

  return user ? <LoggedInUser user={user} /> : <GuestUser />;
};
