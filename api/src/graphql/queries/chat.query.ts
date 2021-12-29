import { ExpressContext } from 'apollo-server-express';
import { GraphQLList } from 'graphql';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQlChatType, GraphQLGetChatArgs } from '../typeDefs/chats.typeDef';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { validateGetChatArgs } from '../validators/chat.validator';
import {
  findChatWithChatIdController,
  getUserChatsController,
} from '../../controllers/chat.controller';

export const GET_USER_CHATS: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(GraphQlChatType),
  async resolve(_: any, __: any, context: ExpressContext) {
    const user: any = getUserFromContext(context);
    return await getUserChatsController(user?.id);
  },
};

export const GET_CHAT: GraphQLDefaultFieldConfig = {
  type: GraphQlChatType,
  args: GraphQLGetChatArgs,
  async resolve(_: any, requestArgs: any) {
    const args = validateGetChatArgs(requestArgs);
    return await findChatWithChatIdController(args.chatId);
  },
};
