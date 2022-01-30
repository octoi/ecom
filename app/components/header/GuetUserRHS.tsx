import React from 'react';
import Link from 'next/link';
import { Paths } from '@/utils/constants';
import { Button } from 'evergreen-ui';

export const GuestUserRHS: React.FC = () => {
  return (
    <div className='flex items-center'>
      <Link href={Paths.login} passHref>
        <Button appearance='primary' size='large'>
          Login
        </Button>
      </Link>
      <Link href={Paths.register} passHref>
        <Button className='ml-2' appearance='minimal' size='large'>
          Register
        </Button>
      </Link>
    </div>
  );
};
