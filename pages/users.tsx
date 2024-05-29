import type { GetServerSideProps } from 'next';
import { type InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MdCreate, MdDelete } from 'react-icons/md';
import { ActionIcon, Avatar, Button, Center, Flex, Stack, Table, Text, Title } from '@mantine/core';
import AddUserFormModal from 'components/add-user-form-modal';
import AppShell from 'components/app-shell';
import routes from 'components/app-shell/routes';
import ConfirmModal from 'components/confirm-modal';
import EditUserFormModal from 'components/edit-user-form-modal';
import PopoverHint from 'components/popover-hint';
import Spinner from 'components/spinner';
import useUsers from 'hooks/use-users';
import { Permissions, usePermissions } from 'permissions';
import { useAuth0User } from 'providers/auth0-provider';
import useModal from 'providers/modal/use-modal';
import deleteUser from 'services/delete-user';
import mongoDbConnection from 'utils/mongo-db-connection';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const {
    user: { accessToken },
  } = useAuth0User();
  const { userHasPermission } = usePermissions();
  const [openAddUserModal] = useModal(AddUserFormModal);
  const [openConfirmModal, closeConfirmModal] = useModal(ConfirmModal);
  const [openEditUserModal] = useModal(EditUserFormModal);
  const { users, loading, error, refetch } = useUsers();

  // Permissions
  const canCreateUsers = userHasPermission(Permissions.CreateUsers);
  const canUpdateUsers = userHasPermission(Permissions.UpdateUsers);
  const canDeleteUsers = userHasPermission(Permissions.DeleteUsers);

  const handleAddUser = () => openAddUserModal({ refetch });

  const handleEditUser = (
    user: Pick<Auth0User, 'user_id' | 'email' | 'name' | 'nickname' | 'role'>,
  ) => openEditUserModal({ ...user, refetch });

  const handleDeleteUser = async (userId: string) =>
    openConfirmModal({
      title: 'Delete user',
      description: "Are you sure want to delete this user? This action can't be reverted",
      onConfirm: () =>
        deleteUser(accessToken, userId).then((response) => {
          if (!response.ok) {
            // TODO: Handle error here...
          }
          closeConfirmModal();
          refetch();
        }),
    });

  return (
    <AppShell isDBConnected={isConnected}>
      <Head>
        <title>{routes.find(({ href }) => href === '/users')!.title} | Role App</title>
      </Head>
      <Stack gap='3rem' h='100%'>
        {users && (
          <Flex align='center' justify='space-between'>
            <Title order={2}>Users</Title>
            <PopoverHint disabled={canCreateUsers} text='Only admins can create users'>
              <Button onClick={handleAddUser} disabled={!canCreateUsers}>
                Add user
              </Button>
            </PopoverHint>
          </Flex>
        )}

        <Stack h='100%'>
          {loading && !error && <Spinner label='Loading users...' />}

          {error && (
            <Center h='100%'>
              <Stack align='center' gap='xs'>
                <Text>Some error occurred...</Text>

                <Text>
                  {error.cause.statusCode} {error.cause.message}
                </Text>

                <Text>Please try again</Text>
                <Button onClick={router.reload}>Refersh</Button>
              </Stack>
            </Center>
          )}

          {users && users.length === 0 && (
            <Center h='100%'>
              <Text>There are no users created yet.</Text>
            </Center>
          )}

          {users && users.length > 0 && (
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
                          <PopoverHint
                            disabled={canUpdateUsers}
                            text='Only admins and moderators can update users'
                          >
                            <ActionIcon
                              size='lg'
                              disabled={!canUpdateUsers}
                              onClick={() =>
                                handleEditUser({ user_id, name, nickname, email, role })
                              }
                            >
                              <MdCreate size='1.3rem' />
                            </ActionIcon>
                          </PopoverHint>

                          <PopoverHint
                            disabled={canDeleteUsers}
                            text='Only admins can delete users.'
                          >
                            <ActionIcon
                              size='lg'
                              variant='filled'
                              color='red'
                              disabled={!canDeleteUsers}
                              onClick={() => handleDeleteUser(user_id)}
                            >
                              <MdDelete size='1.3rem' />
                            </ActionIcon>
                          </PopoverHint>
                        </Flex>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Flex>
          )}
        </Stack>
      </Stack>
    </AppShell>
  );
};
