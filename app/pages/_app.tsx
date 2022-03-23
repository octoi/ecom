import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloWrapper } from '@/components/ApolloWrapper';
import { MantineWrapper } from '@/components/MantineWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloWrapper>
      <MantineWrapper>
        <Component {...pageProps} />
      </MantineWrapper>
    </ApolloWrapper>
  );
}
