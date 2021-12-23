import { GraphQLFieldConfigArgumentMap, GraphQLObjectType } from 'graphql';
import { GraphQLID, GraphQLString } from 'graphql';

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

export const GraphQLUpdateUserArgsType: GraphQLFieldConfigArgumentMap = {
  newName: { type: GraphQLString },
  newEmail: { type: GraphQLString },
  newProfile: { type: GraphQLString },
  newPassword: { type: GraphQLString },
};
