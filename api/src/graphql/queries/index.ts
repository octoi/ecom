import { GraphQLObjectType } from 'graphql';
import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT } from './product.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getAllProducts: GET_ALL_PRODUCTS,
    getOneProduct: GET_ONE_PRODUCT,
  }),
});
