import React from 'react';
import { userStore } from '@/state/user.state';
import { GuestUser } from './GuestUser';
import { LoggedInUser } from './LoggedInUser';
import { Downgraded } from '@hookstate/core';

export const MenuButton = () => {
  const user = userStore.attach(Downgraded).get();

  return user ? <LoggedInUser user={user} /> : <GuestUser />;
};
