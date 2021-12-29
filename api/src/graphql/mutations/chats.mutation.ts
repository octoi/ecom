import { ExpressContext } from 'apollo-server-express';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import {
  newChatController,
  newMessageController,
} from '../../controllers/chat.controller';
import {
  validateNewChatArgs,
  validateNewMessageArgs,
} from '../validators/chat.validator';
import {
  GraphQLChatMessage,
  GraphQlChatType,
  GraphQlNewChatArgs,
  GraphQLNewMessageArgs,
} from '../typeDefs/chats.typeDef';

export const NEW_CHAT: GraphQLDefaultFieldConfig = {
  type: GraphQlChatType,
  args: GraphQlNewChatArgs,
  async resolve(_: any, requestArgs: any, context: ExpressContext) {
    const args = validateNewChatArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return await newChatController(user?.id, args.targetUserId);
  },
};

export const NEW_MESSAGE: GraphQLDefaultFieldConfig = {
  type: GraphQLChatMessage,
  args: GraphQLNewMessageArgs,
  async resolve(_: any, requestArgs: any, context: ExpressContext) {
    const args = validateNewMessageArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return await newMessageController(args.message, args.chatId, user?.id);
  },
};
