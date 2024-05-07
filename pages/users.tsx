import type { GetServerSideProps } from 'next';
import { type InferGetServerSidePropsType } from 'next';
import { Flex } from '@mantine/core';
import AppShell from 'components/app-shell';
import mongoDbConnection from 'utils/mongo-db-connection';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppShell isDBConnected={isConnected}>
    <Flex>Here will be listed all the available users</Flex>
  </AppShell>
);
