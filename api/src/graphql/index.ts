import { GraphQLSchema } from 'graphql';
import { Mutations } from './mutations';
import { Queries } from './queries';
import { Subscriptions } from './subscriptions';

export const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
  subscription: Subscriptions,
});
