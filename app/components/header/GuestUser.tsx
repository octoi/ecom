import React from 'react';
import Link from 'next/link';
import { ActionIcon, Menu, createStyles } from '@mantine/core';
import { User, Login, Forms } from 'tabler-icons-react';
import { Paths } from '@/utils/paths';

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

export const GuestUser = () => {
  const { classes } = useStyles();

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
          <User size={18} />
        </ActionIcon>
      }
    >
      <Menu.Label>Application</Menu.Label>
      <Link href={Paths.login} passHref>
        <Menu.Item className={classes.hoverItem} icon={<Login size={14} />}>
          Login
        </Menu.Item>
      </Link>
      <Link href={Paths.register} passHref>
        <Menu.Item className={classes.hoverItem} icon={<Forms size={14} />}>
          Register
        </Menu.Item>
      </Link>
    </Menu>
  );
};
