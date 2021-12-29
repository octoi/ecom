import { GraphQLDefaultFieldConfig } from '../typeDefs/general.typeDef';
import { validateArgsWithChatId } from '../validators/chat.validator';
import {
  GraphQLArgsWithChatId,
  GraphQLChatMessage,
} from '../typeDefs/chats.typeDef';
import { pubsub } from '../../types/pubsub';

export const NEW_MESSAGE: GraphQLDefaultFieldConfig = {
  type: GraphQLChatMessage,
  args: GraphQLArgsWithChatId,
  subscribe(_: any, requestArgs: any) {
    const args = validateArgsWithChatId(requestArgs);
    return pubsub.asyncIterator([`NEW_MESSAGE_${args.chatId}`]);
  },
};
