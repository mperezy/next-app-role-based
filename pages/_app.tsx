import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import Auth0Provider from 'providers/auth0-provider';
import mantineTheme from 'mantine-theme';

import '@mantine/core/styles.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default ({ Component, pageProps }: AppProps) => (
  <MantineProvider theme={mantineTheme}>
    <Auth0Provider>
      <div className={spaceGrotesk.className}>
        <Component {...pageProps} />
      </div>
    </Auth0Provider>
  </MantineProvider>
);
