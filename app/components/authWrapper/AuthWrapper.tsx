import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from '@hookstate/core';
import { userStore } from '@/states/user.state';
import { Paths } from '@/types/constant.type';

const guestUserAllowedPaths = [
  Paths.login.toString(),
  Paths.register.toString(),
];

export const AuthWrapper: React.FC = ({ children }) => {
  const userState = useState(userStore);
  const router = useRouter();

  const user = userState.get();

  useEffect(() => {
    const pathname = router.pathname;

    if (!user) {
      if (guestUserAllowedPaths.includes(pathname)) return;
      router.push(Paths.login);
    } else {
      if (!guestUserAllowedPaths.includes(pathname)) return;
      router.push(Paths.home);
    }
  }, [user, router]);

  return <div>{children}</div>;
};
