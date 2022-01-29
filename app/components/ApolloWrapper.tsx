import React from 'react';
import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '@/utils/jwt';
import { GRAPHQL_ENDPOINT } from '@/utils/constants';

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
