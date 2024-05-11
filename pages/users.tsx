import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { type InferGetServerSidePropsType } from 'next';
import { Button, Flex, Stack, Title } from '@mantine/core';
import AppShell from 'components/app-shell';
import Spinner from 'components/spinner';
import User from 'components/user';
import useUsers from 'hooks/use-users';
import mongoDbConnection from 'utils/mongo-db-connection';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const users = useUsers();

  return (
    <AppShell isDBConnected={isConnected}>
      <Head>
        <title>Users | Role App</title>
      </Head>
      <Stack gap='3rem' h='100%'>
        <Flex align='center' justify='space-between'>
          <Title order={2}>Users</Title>
          <Button>Add user</Button>
        </Flex>

        <Stack h='100%'>
          {users ? (
            users.map((user, index) => <User key={index} {...user} />)
          ) : (
            <Spinner label='Loading users...' />
          )}
        </Stack>
      </Stack>
    </AppShell>
  );
};
