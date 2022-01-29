import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userStore } from '@/state/user.state';
import { useState } from '@hookstate/core';
import { Paths } from '@/utils/constants';

const redirectBlacklistedPaths = ['/account/login', '/account/register'];

export const AuthShield: React.FC = ({ children }) => {
  const userState = useState(userStore);
  const router = useRouter();

  const user = userState.get();

  useEffect(() => {
    const pathname = router.pathname;

    if (!user) {
      if (redirectBlacklistedPaths.includes(pathname)) return;
      router.push(Paths.login);
    } else {
      if (!redirectBlacklistedPaths.includes(pathname)) return;
      router.push(Paths.app);
    }
  }, [user, router]);

  return <div>{children}</div>;
};
