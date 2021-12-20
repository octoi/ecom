import { UserInputError } from 'apollo-server';
import { loginUser, registerUser } from '../models/user.model';
import { LoginRequestArgs, RegisterRequestArgs } from '../types/request';
import { generateToken } from '../utils/jwt';

// Takes `registerRequestArgs` and return user data with token
export const registerController = async (args: RegisterRequestArgs) => {
  const user: any = await registerUser(args).catch((err) => {
    throw new UserInputError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

// Takes `loginRequestArgs` and return user data with token
export const loginController = async (args: LoginRequestArgs) => {
  const user: any = await loginUser(args).catch((err) => {
    throw new UserInputError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};
