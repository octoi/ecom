import { getUserDetailsController } from '../../controllers/user.controller';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { validateContainingEmailArgs } from '../validators/user.validator';
import {
  GraphQLGetUserDetailsArgsType,
  GraphQLUserType,
} from '../typeDefs/user.typeDef';

export const GET_USER_DETAILS: GraphQLDefaultFieldConfig = {
  type: GraphQLUserType,
  args: GraphQLGetUserDetailsArgsType,
  async resolve(parent: any, requestArgs: any) {
    const args = validateContainingEmailArgs(requestArgs);
    return await getUserDetailsController(args.email);
  },
};
