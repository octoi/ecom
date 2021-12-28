import { prismaClient } from './prisma';

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
        },
      })
      .then((chat) => {
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
        },
      })
      .then((chat) => {
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
