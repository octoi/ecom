import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloWrapper } from '@/components/ApolloWrapper';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

export default function App({ Component, pageProps }: AppProps) {
  const colorScheme = useColorScheme(); // get system colorscheme (`dark` || `light`)

  return (
    <ApolloWrapper>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ApolloWrapper>
  );
}
