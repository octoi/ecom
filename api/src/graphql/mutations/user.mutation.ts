import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import {
  LoginRequestArgs,
  RegisterRequestArgs,
  UpdateUserRequestArgs,
} from '../../types/request';
import {
  GraphQLUpdateUserArgsType,
  GraphQLUserType,
} from '../typeDefs/user.typeDef';
import {
  loginController,
  registerController,
  updateUserController,
} from '../../controllers/user.controller';
import {
  validateLoginArgs,
  validateRegisterArgs,
} from '../validators/user.validator';
import { ExpressContext } from 'apollo-server-express';
import { getUserFromContext } from '../../utils/jwt';

// Register mutation
export const REGISTER: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLUserType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, requestArgs: any) {
    const args: RegisterRequestArgs = validateRegisterArgs(requestArgs);
    return registerController(args);
  },
};

// Login mutation
export const LOGIN: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLUserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, requestArgs: any) {
    const args: LoginRequestArgs = validateLoginArgs(requestArgs);
    return loginController(args);
  },
};

// Update mutation
export const UPDATE_USER: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLUserType,
  args: GraphQLUpdateUserArgsType,
  async resolve(parent: any, requestArgs: any, context: ExpressContext) {
    const args: UpdateUserRequestArgs = requestArgs;
    const user: any = getUserFromContext(context);
    return updateUserController(args, user);
  },
};
