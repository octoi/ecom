import { prismaClient } from './prisma';

/*
  Usage: new message
  Implementation: update chat, `messages` field
*/
export const newMessage = (data: {
  message: string;
  chatId: string;
  senderId: number;
}) => {
  return new Promise((resolve, reject) => {
    prismaClient.message
      .create({ data })
      .then(resolve)
      .catch(() => {
        reject('Failed to send message');
      });
  });
};

/*
  Usage: new chat
  Implementation: adding new chat to `Chat` table
*/
export const newChat = (loggedInUserId: number, targetUserId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.chat
      .create({
        data: {
          senderId: loggedInUserId,
          receiverId: targetUserId,
        },
        include: {
          sender: true,
          receiver: true,
          messages: true,
        },
      })
      .then(resolve)
      .catch(() => {
        reject('Failed to create chat');
      });
  });
};

/*
  Usage: new message
  Implementation: update chat, `messages` field
*/
export const deleteChat = (chatId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.chat
      .delete({ where: { id: chatId } })
      .then(() => resolve(`${chatId} deleted successfully`))
      .catch(() => reject(`Failed to delete chat ${chatId}`));
  });
};

/*
  Usage: get user chats
  Implementation: getting all chats with senderId or receiverId equals to userId
*/
export const getUserChats = (userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.chat
      .findMany({
        where: {
          OR: [{ senderId: userId }, { receiverId: userId }],
        },
        orderBy: [{ lastMessageTime: 'desc' }],
        include: {
          sender: true,
          receiver: true,
        },
      })
      .then(resolve)
      .catch(() => {
        reject('Failed to get user chats');
      });
  });
};

/*
  Usage: find chat with user id
  Implementation: finding chat with 2 possible combination
*/
export const findChatWithUsersInIt = (
  loggedInUserId: number,
  targetUserId: number
) => {
  return new Promise((resolve, reject) => {
    prismaClient.chat
      .findFirst({
        where: {
          OR: [
            { senderId: loggedInUserId, receiverId: targetUserId },
            { senderId: targetUserId, receiverId: loggedInUserId },
          ],
        },
        include: {
          sender: true,
          receiver: true,
          messages: true,
        },
      })
      .then((chat: any) => {
        if (!chat) {
          reject('No chat exist');
          return;
        }

        resolve(chat);
      })
      .catch(() => {
        reject('Failed to find chat');
      });
  });
};

/*
  Usage: find chat with chat id
  Implementation: getting chat with chat id
*/
export const findChatWithChatId = (chatId: string) => {
  return new Promise((resolve, reject) => {
    prismaClient.chat
      .findUnique({
        where: { id: chatId },
        include: {
          sender: true,
          receiver: true,
          messages: true,
        },
      })
      .then((chat: any) => {
        if (!chat) {
          reject(`Failed to find chat with id ${chatId}`);
          return;
        }
        resolve(chatId);
      })
      .catch(() => {
        reject(`Failed to find chat with id ${chatId}`);
      });
  });
};
