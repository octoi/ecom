import { GraphQLObjectType } from 'graphql';
import { ALL_MESSAGES, NEW_MESSAGE } from './chat.subscription';

export const Subscriptions = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    allMessages: ALL_MESSAGES,
    newMessage: NEW_MESSAGE,
  }),
});
