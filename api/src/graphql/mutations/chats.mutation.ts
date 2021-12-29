import { ExpressContext } from 'apollo-server-express';
import { newChatController } from '../../controllers/chat.controller';
import { getUserFromContext } from '../../utils/jwt';
import { GraphQlChatType, GraphQlNewChatArgs } from '../typeDefs/chats.typeDef';
import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { validateNewChatArgs } from '../validators/chat.validator';

export const NEW_CHAT: GraphQLDefaultFieldConfig = {
  type: GraphQlChatType,
  args: GraphQlNewChatArgs,
  resolve(_: any, requestArgs: any, context: ExpressContext) {
    const args = validateNewChatArgs(requestArgs);
    const user: any = getUserFromContext(context);
    return newChatController(user?.id, args.targetUserId);
  },
};
