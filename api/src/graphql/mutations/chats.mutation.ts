import { GraphQLString } from 'graphql';
import { Context } from '../../types/default';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import {
  deleteChatController,
  newChatController,
  newMessageController,
} from '../../controllers/chat.controller';
import {
  validateArgsWithChatId,
  validateNewChatArgs,
  validateNewMessageArgs,
} from '../validators/chat.validator';
import {
  GraphQLArgsWithChatId,
  GraphQLChatMessage,
  GraphQlChatType,
  GraphQlNewChatArgs,
  GraphQLNewMessageArgs,
} from '../typeDefs/chats.typeDef';

export const NEW_CHAT: GraphQLDefaultFieldConfig = {
  type: GraphQlChatType,
  args: GraphQlNewChatArgs,
  async resolve(_: any, requestArgs: any, context: Context) {
    const args = validateNewChatArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return await newChatController(user?.id, args.targetUserId);
  },
};

export const NEW_MESSAGE: GraphQLDefaultFieldConfig = {
  type: GraphQLChatMessage,
  args: GraphQLNewMessageArgs,
  async resolve(_: any, requestArgs: any, context: Context) {
    const args = validateNewMessageArgs(requestArgs);
    const user: any = getUserFromContext(context);

    return await newMessageController(args.message, args.chatId, user?.id);
  },
};

export const DELETE_CHAT: GraphQLDefaultFieldConfig = {
  type: GraphQLString,
  args: GraphQLArgsWithChatId,
  async resolve(_: any, requestArgs: any, context: Context) {
    const args = validateArgsWithChatId(requestArgs);
    const user: any = getUserFromContext(context);
    return await deleteChatController(args.chatId, user?.id);
  },
};
