import { UserProvider } from '@auth0/nextjs-auth0/client';
import { MantineProvider } from '@mantine/core';
import mantineTheme from 'mantine-theme';
import type { RoleBasedAuth0Context } from 'providers/auth0-provider';
import ModalProvider from 'providers/modal';

const mockedUser: RoleBasedAuth0Context['user'] = {
  nickname: 'mock.user',
  name: 'Mock User',
  picture:
    // eslint-disable-next-line max-len
    'https://s.gravatar.com/avatar/42709da7a9b852bc2a1ec2982d3abf6e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png',
  updated_at: '2024-05-23T14:04:19.255Z',
  email: 'mock.user@example.com',
  email_verified: true,
  sub: 'auth0|mock-user-id',
  sid: 'mock-sid',
  role: 'Admin',
  accessToken: 'mock-access-token',
  accessTokenScope: 'openid profile email',
  accessTokenExpiresAt: 1716559460,
  idToken: 'mock-id-token',
  token_type: 'Bearer',
};

export default (Story: any) => (
  <MantineProvider theme={mantineTheme}>
    <UserProvider user={mockedUser}>
      <ModalProvider>
        <Story />
      </ModalProvider>
    </UserProvider>
  </MantineProvider>
);
