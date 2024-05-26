import type { InferGetServerSidePropsType } from 'next';
import { type GetServerSideProps } from 'next';
import { Center, Text } from '@mantine/core';
import AppShell from 'components/app-shell';
import routes from 'components/app-shell/routes';
import { Permissions, PermissionRoute } from 'permissions';
import mongoDbConnection from 'utils/mongo-db-connection';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppShell isDBConnected={isConnected}>
    <Head>
      <title>{routes.find(({ href }) => href === '/moderator')!.title} | Role App</title>
    </Head>
    <PermissionRoute
      alertMessage='This page is only for moderators and admins.'
      permissions={Permissions.ViewModeratorPage}
    >
      <Center h='100%'>
        <Text>This is the Moderator page - just only for Moderator or Admin roles</Text>
      </Center>
    </PermissionRoute>
  </AppShell>
);
