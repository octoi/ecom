import { getToken } from '@/utils/cookie';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  GRAPHQL_ENDPOINT,
  GRAPHQL_SUBSCRIPTION_ENDPOINT,
} from '@/utils/constants';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';

export const getApolloClient = () => {
  const token = getToken();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_ENDPOINT || GRAPHQL_ENDPOINT,
  });

  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(
          createClient({
            url:
              process.env.GRAPHQL_SUBSCRIPTION_ENDPOINT ||
              GRAPHQL_SUBSCRIPTION_ENDPOINT,
          })
        )
      : null;

  const link =
    typeof window !== 'undefined' && wsLink != null
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

  const apolloAppClient = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });

  return apolloAppClient;
};
