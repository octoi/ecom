import React from 'react';
import Link from 'next/link';
import { userStore } from '@/state/user.state';
import { Paths } from '@/utils/constants';
import { LogoutWrapper } from '../logout/LogoutWrapper';
import { Avatar, Popover, Menu, Position } from 'evergreen-ui';
import {
  AddIcon,
  InboxIcon,
  CogIcon,
  LogOutIcon,
  PersonIcon,
  SearchIcon,
} from 'evergreen-ui';

export const LoggedInUserRHS: React.FC = () => {
  const user = userStore.get();

  return (
    <div className='flex items-center'>
      <Link href={Paths.search} passHref>
        <SearchIcon className='cursor-pointer mr-5' color='gray700' size={18} />
      </Link>
      <Link href={Paths.newProduct} passHref>
        <AddIcon className='cursor-pointer mr-5' color='gray700' size={18} />
      </Link>
      <Link href={Paths.chat} passHref>
        <InboxIcon className='cursor-pointer mr-5' color='gray700' size={18} />
      </Link>

      <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
            <Menu.Group>
              <Link href={Paths.chat} passHref>
                <Menu.Item icon={InboxIcon}>Chats</Menu.Item>
              </Link>
              <Link href={Paths.newProduct} passHref>
                <Menu.Item icon={AddIcon}>New Product</Menu.Item>
              </Link>
              <Link href={Paths.settings} passHref>
                <Menu.Item icon={CogIcon}>Settings</Menu.Item>
              </Link>
              <Link href={Paths.search} passHref>
                <Menu.Item icon={SearchIcon}>Search</Menu.Item>
              </Link>
              <Link href={`${Paths.user}/${user?.email}`} passHref>
                <Menu.Item icon={PersonIcon}>Profile</Menu.Item>
              </Link>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
              <LogoutWrapper>
                <Menu.Item icon={LogOutIcon} intent='danger'>
                  Logout
                </Menu.Item>
              </LogoutWrapper>
            </Menu.Group>
          </Menu>
        }
      >
        <Avatar src={user?.profile} name={user?.name} size={30} />
      </Popover>
    </div>
  );
};
