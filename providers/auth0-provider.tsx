import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import type { UserContext, UserProfile } from '@auth0/nextjs-auth0/client';
import { UserProvider, withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import Spinner from 'components/spinner';

type AccessTokenData = {
  accessToken: string;
  accessTokenExpiresAt: number;
  accessTokenScope: string;
  idToken: string;
  token_type: 'Bearer';
};

export type RoleBasedAuth0Context = Omit<UserContext, 'user'> & {
  user: UserProfile & AccessTokenData & { role: Role };
};

export const useAuth0User = () => {
  const config = useUser();

  if (!config) {
    throw new Error('Called useAuth0User outside of its context');
  }

  return config as RoleBasedAuth0Context;
};

type Props = {
  children: ReactNode;
};

const Root = ({ children }: Props) => {
  const { isLoading, error } = useAuth0User();

  if (isLoading) return <Spinner screenHeight />;

  if (error) return <>Error...</>;

  return <>{children}</>;
};

export default ({ children }: { children: ReactNode }) => {
  const { pathname: returnTo } = useRouter();

  const Layout = withPageAuthRequired(() => <Root>{children}</Root>, {
    onError: () => <>Error...</>,
    onRedirecting: () => <Spinner screenHeight />,
    returnTo,
  });

  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
};
