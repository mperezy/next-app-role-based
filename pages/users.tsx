import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { type InferGetServerSidePropsType } from 'next';
import { MdCreate, MdDelete } from 'react-icons/md';
import { ActionIcon, Avatar, Button, Flex, Stack, Table, Title } from '@mantine/core';
import AddUserFormModal from 'components/add-user-form-modal';
import AppShell from 'components/app-shell';
import ConfirmModal from 'components/confirm-modal';
import EditUserFormModal from 'components/edit-user-form-modal';
import Spinner from 'components/spinner';
import useUsers from 'hooks/use-users';
import { useAuth0User } from 'providers/auth0-provider';
import useModal from 'providers/modal/use-modal';
import mongoDbConnection from 'utils/mongo-db-connection';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    user: { accessToken },
  } = useAuth0User();
  const [openAddUserModal] = useModal(AddUserFormModal);
  const [openConfirmModal, closeConfirmModal] = useModal(ConfirmModal);
  const [openEditUserModal] = useModal(EditUserFormModal);
  const { users, refetch } = useUsers();

  const handleAddUser = () => openAddUserModal({ refetch });

  const handleEditUser = (
    user: Pick<Auth0User, 'user_id' | 'email' | 'name' | 'nickname' | 'role'>,
  ) => openEditUserModal({ ...user });

  const handleDeleteUser = async (userId: string) =>
    openConfirmModal({
      title: 'Delete user',
      description: "Are you sure want to delete this user? This action can't be reverted",
      onConfirm: () =>
        fetch(`/api/users?userId=${userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then(() => {
          closeConfirmModal();
          refetch();
        }),
    });

  return (
    <AppShell isDBConnected={isConnected}>
      <Head>
        <title>Users | Role App</title>
      </Head>
      <Stack gap='3rem' h='100%'>
        {users && (
          <Flex align='center' justify='space-between'>
            <Title order={2}>Users</Title>
            <Button onClick={handleAddUser}>Add user</Button>
          </Flex>
        )}

        <Stack h='100%'>
          {users ? (
            <Flex style={{ overflow: 'auto' }}>
              <Table striped stickyHeader>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th align='center'>@</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {users.map(({ user_id, picture, name, nickname, email, role }, index) => (
                    <Table.Tr key={index}>
                      <Table.Td align='center'>
                        <Avatar src={picture} w={40} h={40} />
                      </Table.Td>
                      <Table.Td>{name}</Table.Td>
                      <Table.Td>{nickname}</Table.Td>
                      <Table.Td>{email}</Table.Td>
                      <Table.Td>
                        <Flex align='center' gap='xs'>
                          <ActionIcon
                            size='lg'
                            onClick={() => handleEditUser({ user_id, name, nickname, email, role })}
                          >
                            <MdCreate size='1.3rem' />
                          </ActionIcon>

                          <ActionIcon
                            size='lg'
                            variant='filled'
                            color='red'
                            onClick={() => handleDeleteUser(user_id)}
                          >
                            <MdDelete size='1.3rem' />
                          </ActionIcon>
                        </Flex>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Flex>
          ) : (
            <Spinner label='Loading users...' />
          )}
        </Stack>
      </Stack>
    </AppShell>
  );
};
