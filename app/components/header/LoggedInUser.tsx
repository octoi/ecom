import type { UserType } from '@/utils/types';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { logoutUser } from '@/utils/user';
import { useModals } from '@mantine/modals';
import {
  ActionIcon,
  Menu,
  createStyles,
  Divider,
  Avatar,
  Text,
} from '@mantine/core';
import {
  Settings,
  Search,
  ShoppingCartPlus,
  MessageCircle,
  Logout,
  UserCircle,
} from 'tabler-icons-react';

interface Props {
  user: UserType;
}

const useStyles = createStyles((theme) => ({
  hoverItem: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
}));

export const LoggedInUser: React.FC<Props> = ({ user }) => {
  const modals = useModals();
  const router = useRouter();

  const { classes } = useStyles();

  const openLogoutModal = () =>
    modals.openConfirmModal({
      title: 'Logout',
      centered: true,
      children: (
        <Text size='sm'>
          Are you sure you want to logout from this amazing app ? You have to
          login again to use this app.
        </Text>
      ),
      labels: { confirm: 'Logout', cancel: 'No, I want to stay' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        logoutUser();
        router.push(Paths.login);
      },
    });

  return (
    <Menu
      placement='end'
      position='bottom'
      control={
        <ActionIcon
          size='lg'
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          })}
        >
          <Avatar src={user?.profile} alt={user?.name} size='xs' />
        </ActionIcon>
      }
    >
      <Menu.Label>Application</Menu.Label>
      <Link href={`${Paths.user}/${user.email}`} passHref>
        <Menu.Item
          className={classes.hoverItem}
          icon={<UserCircle size={14} />}
        >
          Profile
        </Menu.Item>
      </Link>
      <Link href={Paths.settings} passHref>
        <Menu.Item className={classes.hoverItem} icon={<Settings size={14} />}>
          Settings
        </Menu.Item>
      </Link>
      <Link href={Paths.chat} passHref>
        <Menu.Item
          className={classes.hoverItem}
          icon={<MessageCircle size={14} />}
        >
          Messages
        </Menu.Item>
      </Link>
      <Link href={Paths.newProduct} passHref>
        <Menu.Item
          className={classes.hoverItem}
          icon={<ShoppingCartPlus size={14} />}
        >
          New product
        </Menu.Item>
      </Link>
      <Link href={Paths.search} passHref>
        <Menu.Item className={classes.hoverItem} icon={<Search size={14} />}>
          Search
        </Menu.Item>
      </Link>
      <Divider />
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item
        className={classes.hoverItem}
        color='red'
        icon={<Logout size={14} />}
        onClick={openLogoutModal}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};
