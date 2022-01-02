import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloWrapper } from '@/components/apollo/ApolloWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloWrapper>
      <Component {...pageProps} />
    </ApolloWrapper>
  );
}
