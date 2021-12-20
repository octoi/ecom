import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const GraphQLUserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
  }),
});
