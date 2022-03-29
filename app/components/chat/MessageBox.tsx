import React, { useState } from 'react';
import { ActionIcon, TextInput } from '@mantine/core';
import { ArrowBigRight } from 'tabler-icons-react';
import { useMutation } from '@apollo/client';
import { NEW_MESSAGE } from './mutation';
import { useNotifications } from '@mantine/notifications';

interface Props {
  chatId: string;
}

export const MessageBox: React.FC<Props> = ({ chatId }) => {
  const notifications = useNotifications();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [newMessage] = useMutation(NEW_MESSAGE);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    newMessage({ variables: { chatId, message } })
      .then(() => setMessage(''))
      .catch((err) => {
        notifications.showNotification({
          title: 'Failed to delete chat',
          message: err?.message,
          autoClose: 3000,
          color: 'red',
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className='w-full mt-5 flex items-center' onSubmit={handleFormSubmit}>
      <TextInput
        placeholder='Message..'
        variant='filled'
        size='lg'
        type='text'
        required
        className='w-full'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
      />
      <ActionIcon loading={loading} type='submit' className='ml-2'>
        <ArrowBigRight />
      </ActionIcon>
    </form>
  );
};
