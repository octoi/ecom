import { ExpressContext } from 'apollo-server-express';
import { newProductController } from '../../controllers/product.controller';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import {
  GraphQLNewProductArgsType,
  GraphQLProductType,
} from '../typeDefs/product.typeDef';
import { validateNewProductArgs } from '../validators/product.validator';

// New Product mutation
export const NEW_PRODUCT: GraphQLDefaultFieldConfig = {
  type: GraphQLProductType,
  args: GraphQLNewProductArgsType,
  async resolve(parent: any, requestArgs: any, context: ExpressContext) {
    const args = validateNewProductArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return newProductController(args, user?.id);
  },
};
