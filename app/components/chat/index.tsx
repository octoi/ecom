import { ChatType, UserType } from '@/utils/types';
import React from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageBox } from './MessageBox';

interface Props {
  chat: ChatType;
  targetUser: UserType;
}

export const ChatComponent: React.FC<Props> = ({ chat, targetUser }) => {
  return (
    <div>
      <ChatHeader chatId={chat.id} targetUser={targetUser} />
      <MessageBox chatId={chat.id} />
    </div>
  );
};
