import { UserInputError } from 'apollo-server';

export const validateNewChatArgs = (args: { targetUserId: number }) => {
  if (!args.targetUserId) {
    throw new UserInputError('required fields not found');
  }

  return args;
};

export const validateNewMessageArgs = (args: {
  chatId: string;
  message: string;
}) => {
  if (!args.chatId || !args.message) {
    throw new UserInputError('required fields not found');
  }

  return args;
};
