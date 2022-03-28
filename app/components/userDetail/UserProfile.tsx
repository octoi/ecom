import React from 'react';
import { upperFirst } from '@mantine/hooks';
import { UserType } from '@/utils/types';
import { getUserData } from '@/state/user.state';
import {
  Avatar,
  Button,
  Center,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { Paths } from '@/utils/paths';

interface Props {
  user: UserType;
}

export const UserProfile: React.FC<Props> = ({ user }) => {
  const theme = useMantineTheme();

  const loggedInUser = getUserData();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Center className='flex-col'>
      <Avatar
        src={user.profile}
        alt={user.name}
        size='xl'
        className='rounded-full'
      />
      <Title order={2} className='mt-2'>
        {upperFirst(user.name)}
      </Title>
      <Text size='lg' style={{ color: secondaryColor }} className='mt-2'>
        {user.email}
      </Text>
      {loggedInUser && loggedInUser.email !== user.email && (
        <Link passHref href={Paths.chat + '/' + user.email}>
          <Button className='mt-2' variant='outline' color='indigo'>
            Message
          </Button>
        </Link>
      )}
    </Center>
  );
};
