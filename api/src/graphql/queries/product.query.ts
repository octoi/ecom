import { GraphQLList } from 'graphql';
import { getAllProductsController } from '../../controllers/product.controller';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { GraphQLProductType } from '../typeDefs/product.typeDef';

// Get All Products query
export const GET_ALL_PRODUCTS: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(GraphQLProductType),
  async resolve() {
    return getAllProductsController();
  },
};
