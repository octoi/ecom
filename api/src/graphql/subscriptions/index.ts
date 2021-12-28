import { GraphQLObjectType, GraphQLString } from 'graphql';

export const Subscriptions = new GraphQLObjectType({
  name: 'Subscription',
  fields: () => ({
    hello: {
      type: GraphQLString,
      subscribe: (_: any, __: any, { pubsub }) => {
        return pubsub.asyncIterator(['MESSAGES']);
      },
    },
  }),
});
