import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';
import { PubSub } from 'graphql-subscriptions';
import express from 'express';

const app = express();
const httpServer = createServer(app);
const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: '/' }
);

const pubsub = new PubSub();

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req, pubsub }),
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

const PORT = process.env.PORT || 5000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
