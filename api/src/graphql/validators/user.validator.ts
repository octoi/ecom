import { UserInputError } from 'apollo-server';
import { LoginRequestArgs, RegisterRequestArgs } from '../../types/request';

export const validateRegisterArgs = (
  args: RegisterRequestArgs
): RegisterRequestArgs => {
  if (!args.email || !args.name || !args.password || !args.profile) {
    throw new UserInputError('required fields not found');
  }

  return args;
};

export const validateLoginArgs = (args: LoginRequestArgs): LoginRequestArgs => {
  if (!args.email || !args.password) {
    throw new UserInputError('required fields not found');
  }

  return args;
};

export const validateContainingEmailArgs = (args: {
  email: string;
}): { email: string } => {
  if (!args.email) {
    throw new UserInputError('required fields not found');
  }

  return args;
};
