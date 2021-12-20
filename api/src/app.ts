import { ApolloServer } from 'apollo-server';
import { schema } from './graphql';

const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

const port = process.env.PORT || 5000;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
