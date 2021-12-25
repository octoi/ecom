import { GraphQLFieldConfigArgumentMap, GraphQLObjectType } from 'graphql';
import { GraphQLID, GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import { GraphQLUserType } from './user.typeDef';

export const GraphQLProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    price: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    ownerId: { type: GraphQLID },
    owner: { type: GraphQLUserType },
  }),
});

export const GraphQlProductListType = new GraphQLList(GraphQLProductType);

export const GraphQLNewProductArgsType: GraphQLFieldConfigArgumentMap = {
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  price: { type: GraphQLInt },
  images: { type: new GraphQLList(GraphQLString) },
};

export const GraphQLGetAllProductsArgsType: GraphQLFieldConfigArgumentMap = {
  page: { type: GraphQLInt },
};

export const GraphQLProductIdArgs: GraphQLFieldConfigArgumentMap = {
  productId: { type: GraphQLString },
};
