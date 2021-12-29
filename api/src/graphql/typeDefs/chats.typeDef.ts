import { GraphQLFieldConfigArgumentMap, GraphQLObjectType } from 'graphql';
import { GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { GraphQLUserType } from './user.typeDef';

export const GraphQlChatType = new GraphQLObjectType({
  name: 'Chat',
  fields: () => ({
    id: { type: GraphQLID },
    messages: { type: new GraphQLList(GraphQLChatMessage) },
    senderId: { type: GraphQLInt },
    receiverId: { type: GraphQLID },
    sender: { type: GraphQLUserType },
    receiver: { type: GraphQLUserType },
  }),
});

export const GraphQLChatMessage = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    time: { type: GraphQLInt },
    senderId: { type: GraphQLID },
  }),
});

export const GraphQlNewChatArgs: GraphQLFieldConfigArgumentMap = {
  targetUserId: { type: GraphQLInt },
};
