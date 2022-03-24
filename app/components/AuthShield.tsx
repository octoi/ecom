import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userStore } from '@/state/user.state';
import { useState } from '@hookstate/core';
import { Paths } from '@/utils/paths';

// `toString()` to get the inside value
const guestUserDeniedRoutes = [
  Paths.chat.toString(),
  Paths.newProduct.toString(),
  Paths.settings.toString(),
];

const loggedInUserDeniedRoutes = [
  Paths.login.toString(),
  Paths.register.toString(),
];

export const AuthShield: React.FC = ({ children }) => {
  const userState = useState(userStore);
  const router = useRouter();

  const user = userState.get();

  useEffect(() => {
    const pathname = router.pathname;

    if (user) {
      if (!loggedInUserDeniedRoutes.includes(pathname)) return;
      router.push(Paths.app);
    }

    if (!user) {
      if (!guestUserDeniedRoutes.includes(pathname)) return;
      router.push(`${Paths.login.toString()}?next=${pathname}`);
    }
  }, [user, router]);

  return <div>{children}</div>;
};
