import React from 'react';
import Link from 'next/link';
import { Paths } from '@/types/constant.type';
import { Button } from 'react-bootstrap';

export const GuestUserRHS = () => {
  return (
    <div>
      <Link passHref href={Paths.login}>
        <Button className='bg-black border-none transition-all hover:opacity-80'>
          Login
        </Button>
      </Link>
      <Link passHref href={Paths.register}>
        <Button className='bg-black border-none transition-all hover:opacity-80 ml-1'>
          Register
        </Button>
      </Link>
    </div>
  );
};
