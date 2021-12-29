import { ExpressContext } from 'apollo-server-express';
import { GraphQLList } from 'graphql';
import { getUserChatsController } from '../../controllers/chat.controller';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQlChatType } from '../typeDefs/chats.typeDef';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';

export const GET_USER_CHATS: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(GraphQlChatType),
  async resolve(_: any, __: any, context: ExpressContext) {
    const user: any = getUserFromContext(context);
    return await getUserChatsController(user?.id);
  },
};
