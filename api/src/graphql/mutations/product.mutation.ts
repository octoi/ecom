import { GraphQLString } from 'graphql';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import {
  deleteProductController,
  newProductController,
} from '../../controllers/product.controller';
import {
  validateNewProductArgs,
  validateProductIdArgs,
} from '../validators/product.validator';
import {
  GraphQLNewProductArgsType,
  GraphQLProductIdArgs,
  GraphQLProductType,
} from '../typeDefs/product.typeDef';
import { Context } from '../../types/default';

// New Product mutation
export const NEW_PRODUCT: GraphQLDefaultFieldConfig = {
  type: GraphQLProductType,
  args: GraphQLNewProductArgsType,
  async resolve(parent: any, requestArgs: any, context: Context) {
    const args = validateNewProductArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return newProductController(args, user?.id);
  },
};

// Delete Product mutation
export const DELETE_PRODUCT: GraphQLDefaultFieldConfig = {
  type: GraphQLString,
  args: GraphQLProductIdArgs,
  async resolve(parent: any, requestArgs: any, context: Context) {
    const args = validateProductIdArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return deleteProductController(args.productId, user?.id);
  },
};
