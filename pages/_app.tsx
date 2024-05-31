import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { spaceGrotesk } from 'fonts';
import Auth0Provider from 'providers/auth0-provider';
import ModalProvider from 'providers/modal';
import mantineTheme from 'mantine-theme';
import mantineVariableResolver from 'mantine-variable-resolver';

import '@mantine/core/styles.css';

export default ({ Component, pageProps }: AppProps) => (
  <MantineProvider
    theme={mantineTheme}
    cssVariablesResolver={mantineVariableResolver}
    defaultColorScheme='light'
  >
    <Auth0Provider>
      <div className={spaceGrotesk.className}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </div>
    </Auth0Provider>
  </MantineProvider>
);
