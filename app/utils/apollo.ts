import { getToken } from '@/utils/cookie';
import { GRAPHQL_ENDPOINT } from '@/utils/constants';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const getApolloClient = () => {
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

  const apolloAppClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return apolloAppClient;
};
