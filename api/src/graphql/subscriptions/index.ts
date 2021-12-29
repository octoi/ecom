import { GraphQLObjectType } from 'graphql';
import { NEW_MESSAGE } from './chat.subscription';

export const Subscriptions = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    newMessage: NEW_MESSAGE,
  }),
});
