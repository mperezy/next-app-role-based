import type { InferGetServerSidePropsType } from 'next';
import { type GetServerSideProps } from 'next';
import { Center, Text } from '@mantine/core';
import AppShell from 'components/app-shell';
import { Permissions, PermissionRoute } from 'permissions';
import mongoDbConnection from 'utils/mongo-db-connection';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppShell isDBConnected={isConnected}>
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
