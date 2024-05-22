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
      alertMessage='This page is only for moderators and admins.'
      permissions={Permissions.ViewModeratorPage}
    >
      <Center h='100%'>
        <Text>This is the Moderator page - just only for Moderator or Admin roles</Text>
      </Center>
    </PermissionRoute>
  </AppShell>
);
