import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Auth0Provider from 'providers/auth0-provider';
import mantineTheme from 'mantine-theme';

import '@mantine/core/styles.css';

export default ({ Component, pageProps }: AppProps) => (
  <MantineProvider theme={mantineTheme}>
    <Auth0Provider>
      <Component {...pageProps} />
    </Auth0Provider>
  </MantineProvider>
);
