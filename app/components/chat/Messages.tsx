import React from 'react';
import { ChatType } from '@/utils/types';
import { useSubscription } from '@apollo/client';
import { NEW_MESSAGES } from './subscription';

interface Props {
  chat: ChatType;
}

export const Messages: React.FC<Props> = ({ chat }) => {
  const { data, loading, error } = useSubscription(NEW_MESSAGES, {
    variables: {
      chatId: chat.id,
    },
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-400'>{error?.message}</p>}
    </div>
  );
};
