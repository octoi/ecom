import { GraphQLInt, GraphQLList } from 'graphql';
import { getAllProductsController } from '../../controllers/product.controller';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { GraphQLProductType } from '../typeDefs/product.typeDef';

// Get All Products query
export const GET_ALL_PRODUCTS: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(GraphQLProductType),
  args: {
    page: { type: GraphQLInt },
  },
  async resolve(parent: any, requestArgs: any) {
    let page: number = requestArgs.page ? requestArgs.page : 0;
    return getAllProductsController(page);
  },
};
