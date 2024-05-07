import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AppShell from 'components/app-shell';
import Spinner from 'components/spinner';
import mongoDbConnection from 'utils/mongo-db-connection';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <AppShell isDBConnected={isConnected}>
    <Spinner />
  </AppShell>
);
