import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import express from 'express';

const main = async () => {
  const app = express();

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
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

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  const URL = `http://localhost:${PORT}/graphq`;

  httpServer.listen(PORT, () => {
    console.log(`🚀  Server ready at ${URL}`);
  });
};

main();
