import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './apolloClient';

export const ApolloWrapper: React.FC = ({ children }) => {
  const client = getApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
