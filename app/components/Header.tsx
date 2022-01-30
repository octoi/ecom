import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Paths } from '@/utils/constants';
import { Button } from 'evergreen-ui';

export const Header: React.FC = () => {
  return (
    <header className='border-2 p-5 flex items-center justify-between'>
      <Link href={Paths.app} passHref>
        <div className='flex items-center cursor-pointer'>
          <Image src='/logo.svg' alt='Ecom' width={30} height={30} />
          <h1 className='text-xl font-medium'>Ecom</h1>
        </div>
      </Link>
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
    </header>
  );
};
