import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userStore } from '@/states/user.state';
import { useState } from '@hookstate/core';
import { Paths } from '@/utils/constants';

const redirectBlacklistedPaths = [
  Paths.login.toString(),
  Paths.register.toString(),
  Paths.home.toString(),
];

export const AuthChecker: React.FC = ({ children }) => {
  const userState = useState(userStore);
  const router = useRouter();

  const user = userState.get();

  useEffect(() => {
    const pathname = router.pathname;

    if (!user) {
      if (redirectBlacklistedPaths.includes(pathname)) return; // if user exits block login & register
      router.push(Paths.login);
    } else {
      if (!redirectBlacklistedPaths.includes(pathname)) return; // if user not exits block other paths
      router.push(Paths.home);
    }
  }, [user, router]);

  return <div>{children}</div>;
};
