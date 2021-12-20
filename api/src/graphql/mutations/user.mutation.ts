import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { registerController } from '../../controllers/user.controller';
import { RegisterRequestArgs } from '../../types/request';
import { GraphQLUserType } from '../typeDefs/user.typeDef';
import { validateRegisterArgs } from '../validators/user.validator';

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
