import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '@/utils/apolloClient';
import React from 'react';

export const ApolloWrapper: React.FC = ({ children }) => {
  const client = getApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
