import { GraphQLList } from 'graphql';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { validateArgsWithChatId } from '../validators/chat.validator';
import {
  GraphQlChatType,
  GraphQLArgsWithChatId,
} from '../typeDefs/chats.typeDef';
import {
  findChatWithChatIdController,
  getUserChatsController,
} from '../../controllers/chat.controller';
import { Context } from '../../types/default';

export const GET_USER_CHATS: GraphQLDefaultFieldConfig = {
  type: new GraphQLList(GraphQlChatType),
  async resolve(_: any, __: any, context: Context) {
    const user: any = getUserFromContext(context);
    return await getUserChatsController(user?.id);
  },
};

export const GET_CHAT: GraphQLDefaultFieldConfig = {
  type: GraphQlChatType,
  args: GraphQLArgsWithChatId,
  async resolve(_: any, requestArgs: any) {
    const args = validateArgsWithChatId(requestArgs);
    return await findChatWithChatIdController(args.chatId);
  },
};
