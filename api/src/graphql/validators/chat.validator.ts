import { UserInputError } from 'apollo-server';

export const validateNewChatArgs = (args: { targetUserId: number }) => {
  if (!args.targetUserId) {
    throw new UserInputError('required fields not found');
  }

  return args;
};
