import { UserInputError } from 'apollo-server';
import {
  deleteChat,
  findChatWithUsersInIt,
  getUserChats,
  newChat,
  newMessage,
} from '../models/chat.model';

export const findChatWithUsersInItController = async (
  loggedInUserId: number,
  targetUserId: number
) => {
  const chat: any = await findChatWithUsersInIt(
    loggedInUserId,
    targetUserId
  ).catch((err) => {
    throw new UserInputError(err);
  });

  return chat;
};

export const newChatController = async (
  loggedInUserId: number,
  targetUserId: number
) => {
  const chat: any = await newChat(loggedInUserId, targetUserId).catch((err) => {
    throw new UserInputError(err);
  });

  return chat;
};

export const deleteChatController = async (chatId: string) => {
  const msg = await deleteChat(chatId).catch((err) => {
    throw new UserInputError(err);
  });

  return msg;
};

export const getUserChatsController = async (userId: number) => {
  const chats: any = await getUserChats(userId).catch((err) => {
    throw new UserInputError(err);
  });

  return chats;
};

export const newMessageController = async (
  message: string,
  chatId: string,
  senderId: number
) => {
  const messageData: any = await newMessage({
    message,
    chatId,
    senderId,
  }).catch((err) => {
    throw new UserInputError(err);
  });

  return messageData;
};
