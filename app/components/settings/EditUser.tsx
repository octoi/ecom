import React, { useState } from 'react';
import { getUserData } from '@/state/user.state';
import { ActionIcon, Avatar, Text, Title } from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { EditUserModal } from './EditUserModal';

export const EditUser: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const smallScreen = !useMediaQuery('(min-width: 523px)');

  const user = getUserData();

  if (!user) return <></>;

  return (
    <>
      <div className='mt-5 flex items-center justify-between'>
        <div className='flex items-center'>
          <Avatar
            src={user.profile}
            alt={user.name}
            size={smallScreen ? 'lg' : 'xl'}
            className='rounded-full'
          />

          <div className={smallScreen ? 'ml-3' : 'ml-5'}>
            <Title order={smallScreen ? 3 : 2}>{user.name}</Title>
            <Text size={smallScreen ? 'md' : 'lg'}>{user.email}</Text>
          </div>
        </div>
        <ActionIcon onClick={() => setOpened(true)}>
          <Edit />
        </ActionIcon>
      </div>
      <EditUserModal user={user} opened={opened} setOpened={setOpened} />
    </>
  );
};
