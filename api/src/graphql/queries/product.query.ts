import { GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { validateProductIdArgs } from '../validators/product.validator';
import { validateContainingEmailArgs } from '../validators/user.validator';
import {
  getAllProductsController,
  getAllUserProducts,
  getOneProductController,
  searchProductController,
} from '../../controllers/product.controller';
import {
  GraphQLGetAllProductsArgsType,
  GraphQLGetAllUserProductsArgsType,
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

// Get All User Products query
export const GET_ALL_USER_PRODUCTS: GraphQLDefaultFieldConfig = {
  type: GraphQlProductListType,
  args: GraphQLGetAllUserProductsArgsType,
  async resolve(parent: any, requestArgs: any) {
    let page: number = requestArgs.page ? requestArgs.page : 0;
    let args = validateContainingEmailArgs(requestArgs);
    return await getAllUserProducts(page, args.email);
  },
};

// Search Product query
export const SEARCH_PRODUCT: GraphQLDefaultFieldConfig = {
  type: GraphQlProductListType,
  args: {
    query: { type: GraphQLString },
  },
  async resolve(parent: any, requestArgs: any) {
    return await searchProductController(requestArgs?.query || '');
  },
};
