import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { userStore } from '@/state/user.state';
import { Paths } from '@/utils/constants';
import { GuestUserRHS } from './GuetUserRHS';
import { LoggedInUserRHS } from './LoggedInUserRHS';
import { Heading, Pane } from 'evergreen-ui';

export const Header: React.FC = () => {
  const user = userStore.get();

  return (
    <Pane display='flex' padding={16} background='tint2' borderRadius={3}>
      <Link href={Paths.app} passHref>
        <Pane cursor='pointer' flex={1} alignItems='center' display='flex'>
          <Image src='/logo.svg' alt='Ecom' width={30} height={30} />
          <Heading size={600}>Ecom</Heading>
        </Pane>
      </Link>
      <Pane>
        {!user && <GuestUserRHS />}
        {user && <LoggedInUserRHS />}
      </Pane>
    </Pane>
  );
};
