import { GraphQLObjectType } from 'graphql';
import { GET_ALL_PRODUCTS } from './product.query';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    getAllProducts: GET_ALL_PRODUCTS,
  }),
});
