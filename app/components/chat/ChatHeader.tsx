import React from 'react';
import { ActionIcon, Avatar, Text } from '@mantine/core';
import { UserType } from '@/utils/types';
import { Trash } from 'tabler-icons-react';
import { useModals } from '@mantine/modals';
import { useMutation } from '@apollo/client';
import { DELETE_CHAT } from './mutation';
import { useRouter } from 'next/router';
import { Paths } from '@/utils/paths';
import { useNotifications } from '@mantine/notifications';

interface Props {
  chatId: string;
  targetUser: UserType;
}

export const ChatHeader: React.FC<Props> = ({ chatId, targetUser }) => {
  const modals = useModals();
  const router = useRouter();
  const notifications = useNotifications();

  const [deleteChat] = useMutation(DELETE_CHAT);

  const handleDeleteChat = () => {
    modals.openConfirmModal({
      title: 'Delete Chat',
      centered: true,
      children: (
        <Text size='sm'>
          Are you sure you want to delete this chat ?. This will delete all
          messages both for you and {targetUser.name}
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'No, Keep chat' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteChat({ variables: { chatId } })
          .then(() => {
            notifications.showNotification({
              title: 'Hope you both are done with deal',
              message: 'Chat deleted successfully',
              autoClose: 3000,
              color: 'teal',
            });

            router.push(Paths.chat);
          })
          .catch((err) => {
            notifications.showNotification({
              title: 'Failed to delete chat',
              message: err?.message,
              autoClose: 3000,
              color: 'red',
            });
          });
      },
    });
  };

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center'>
        <Avatar
          src={targetUser.profile}
          alt={targetUser.name}
          size='md'
          className='rounded-full'
        />
        <Text size='lg' weight={500} className='ml-3'>
          {targetUser.name}
        </Text>
      </div>

      <ActionIcon onClick={handleDeleteChat} size='sm' color='red'>
        <Trash />
      </ActionIcon>
    </div>
  );
};
