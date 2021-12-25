import { GraphQLFieldConfigArgumentMap, GraphQLObjectType } from 'graphql';
import { GraphQLID, GraphQLString, GraphQLInt } from 'graphql';

export const GraphQLUserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
    _count: { type: GraphQLUserProductsCount },
  }),
});

const GraphQLUserProductsCount = new GraphQLObjectType({
  name: 'RoomCount',
  fields: () => ({
    products: { type: GraphQLInt },
  }),
});

export const GraphQLUpdateUserArgsType: GraphQLFieldConfigArgumentMap = {
  newName: { type: GraphQLString },
  newEmail: { type: GraphQLString },
  newProfile: { type: GraphQLString },
  newPassword: { type: GraphQLString },
};

export const GraphQLGetUserDetailsArgsType: GraphQLFieldConfigArgumentMap = {
  email: { type: GraphQLString },
};
