import React, { useEffect, useState } from 'react';
import { ChatType, MessageType } from '@/utils/types';
import { useSubscription } from '@apollo/client';
import { NEW_MESSAGES } from './subscription';
import { Paper, useMantineTheme } from '@mantine/core';
import { getUserData } from '@/state/user.state';
import moment from 'moment';

interface Props {
  chat: ChatType;
}

export const Messages: React.FC<Props> = ({ chat }) => {
  const theme = useMantineTheme();

  const [messages, setMessages] = useState<MessageType[]>(
    chat.messages?.slice().reverse() || []
  );

  const { data, loading, error } = useSubscription(NEW_MESSAGES, {
    variables: {
      chatId: chat.id,
    },
  });

  const loggedInUser = getUserData();

  useEffect(() => {
    if (!loading && data) {
      let newMessages = [...messages];
      newMessages.unshift(data?.newMessage);
      setMessages(newMessages);
    }
  }, [data]);

  return (
    <div className='mt-5'>
      {error && error.message && (
        <p className='text-red-400'>{error?.message}</p>
      )}
      {loggedInUser && (
        <div className='flex flex-col w-full'>
          {messages.map((message) => {
            let isMyMessage =
              message.senderId == parseInt(loggedInUser.id || '0');

            return (
              <div
                key={message.id}
                className={`flex w-full mb-2 break-all ${
                  isMyMessage && 'flex-row-reverse'
                }`}
              >
                <Paper
                  withBorder
                  className={`w-fit p-2 rounded ${
                    isMyMessage && 'text-right'
                  } ${
                    theme.colorScheme === 'dark'
                      ? 'bg-[#25262B]'
                      : 'bg-[#F1F3F5]'
                  }`}
                >
                  <p className='text-app-white mb-1'>
                    {moment(parseInt(message.time)).format(
                      'DD/MM/YYYY hh:mm A'
                    )}
                  </p>
                  <p className='text-app-grey'>{message.message}</p>
                </Paper>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
