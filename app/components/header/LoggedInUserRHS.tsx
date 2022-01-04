/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Paths } from '@/types/constant.type';
import { Dropdown } from 'react-bootstrap';
import { UserType } from '@/types/user.type';
import { logoutUser } from '@/utils/user.util';

export const LoggedInUserRHS: React.FC<{ user: UserType }> = ({ user }) => {
  const router = useRouter();

  const logout = () => {
    logoutUser();
    router.push(Paths.login);
  };

  return (
    <div>
      <Dropdown className='d-inline mx-2'>
        <Dropdown.Toggle
          id='dropdown-autoclose-true'
          className='bg-black border-none'
        >
          {user.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <Link href={`/user/${user?.email}`}>Profile</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href={Paths.settings}>Settings</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href={Paths.chats}>Chats</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href={Paths.newProduct}>New Product</Link>
          </Dropdown.Item>
          <Dropdown.Item onClick={logout} className='text-red-500'>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
