import React from 'react';
import { getToken } from '@/utils/cookie';
import { GRAPHQL_ENDPOINT } from '@/utils/constants';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

export const ApolloWrapper: React.FC = ({ children }) => {
  const token = getToken();

  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_ENDPOINT || GRAPHQL_ENDPOINT,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
