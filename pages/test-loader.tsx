import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AppShell from 'components/app-shell';
import routes from 'components/app-shell/routes';
import Spinner from 'components/spinner';
import mongoDbConnection from 'utils/mongo-db-connection';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppShell isDBConnected={isConnected}>
    <Head>
      <title>{routes.find(({ href }) => href === '/test-loader')!.title} | Role App</title>
    </Head>
    <Spinner />
  </AppShell>
);
