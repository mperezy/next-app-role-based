import { Html, Head, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';

export default () => (
  <Html lang='en'>
    <Head>
      <link rel='icon' type='image/png' href='/images/nextjs-icon.png'></link>
      <ColorSchemeScript />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
