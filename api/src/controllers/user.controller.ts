import { UserInputError } from 'apollo-server';
import {
  findUser,
  loginUser,
  registerUser,
  updateUser,
} from '../models/user.model';
import {
  LoginRequestArgs,
  RegisterRequestArgs,
  UpdateUserRequestArgs,
} from '../types/request';
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

// Takes `UpdateRequestArgs` and return user data with token
export const updateUserController = async (
  args: UpdateUserRequestArgs,
  userId: number
) => {
  const user: any = await updateUser(args, userId).catch((err) => {
    throw new UserInputError(err);
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

// Takes user email and return user data
export const getUserDetailsController = async (email: string) => {
  const user: any = await findUser({ email }).catch((err) => {
    throw new UserInputError(err);
  });

  return user;
};
