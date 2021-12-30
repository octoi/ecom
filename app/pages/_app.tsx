import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloWrapper } from '@/components/core/ApolloWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloWrapper>
      <Component {...pageProps} />
    </ApolloWrapper>
  );
}

export default MyApp;
