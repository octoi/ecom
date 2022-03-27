import React from 'react';
import { upperFirst } from '@mantine/hooks';
import { UserType } from '@/utils/types';
import { Avatar, Center, Text, Title, useMantineTheme } from '@mantine/core';

interface Props {
  user: UserType;
}

export const UserProfile: React.FC<Props> = ({ user }) => {
  const theme = useMantineTheme();

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
    </Center>
  );
};
