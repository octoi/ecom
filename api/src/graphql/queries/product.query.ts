import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { validateProductIdArgs } from '../validators/product.validator';
import {
  getAllProductsController,
  getOneProductController,
} from '../../controllers/product.controller';
import {
  GraphQLGetAllProductsArgsType,
  GraphQLProductIdArgs,
  GraphQlProductListType,
  GraphQLProductType,
} from '../typeDefs/product.typeDef';

// Get All Products query
export const GET_ALL_PRODUCTS: GraphQLDefaultFieldConfig = {
  type: GraphQlProductListType,
  args: GraphQLGetAllProductsArgsType,
  async resolve(parent: any, requestArgs: any) {
    let page: number = requestArgs.page ? requestArgs.page : 0;
    return await getAllProductsController(page);
  },
};

// Get One Product query
export const GET_ONE_PRODUCT: GraphQLDefaultFieldConfig = {
  type: GraphQLProductType,
  args: GraphQLProductIdArgs,
  async resolve(pareny: any, requestArgs: any) {
    const args = validateProductIdArgs(requestArgs);
    return await getOneProductController(args?.productId);
  },
};
