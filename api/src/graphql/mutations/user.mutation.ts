import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { LoginRequestArgs, RegisterRequestArgs } from '../../types/request';
import { GraphQLUserType } from '../typeDefs/user.typeDef';
import {
  loginController,
  registerController,
} from '../../controllers/user.controller';
import {
  validateLoginArgs,
  validateRegisterArgs,
} from '../validators/user.validator';

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
