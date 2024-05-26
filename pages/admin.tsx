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
      <title>{routes.find(({ href }) => href === '/admin')!.title} | Role App</title>
    </Head>
    <PermissionRoute
      alertMessage='This page is only for admins.'
      permissions={Permissions.ViewAdminPage}
    >
      <Center h='100%'>
        <Text>This is the Admin page - just only for Admin role</Text>
      </Center>
    </PermissionRoute>
  </AppShell>
);
