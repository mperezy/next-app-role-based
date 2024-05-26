import type { GetServerSideProps } from 'next';
import { type InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { MdCreate, MdDelete } from 'react-icons/md';
import { ActionIcon, Avatar, Button, Flex, Stack, Table, Title } from '@mantine/core';
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
import mongoDbConnection from 'utils/mongo-db-connection';

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = mongoDbConnection;

export default ({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    user: { accessToken },
  } = useAuth0User();
  const { userHasPermission } = usePermissions();
  const [openAddUserModal] = useModal(AddUserFormModal);
  const [openConfirmModal, closeConfirmModal] = useModal(ConfirmModal);
  const [openEditUserModal] = useModal(EditUserFormModal);
  const { users, refetch } = useUsers();

  // Permissions
  const canCreateUsers = userHasPermission(Permissions.CreateUsers);
  const canUpdateUsers = userHasPermission(Permissions.UpdateUsers);
  const canDeleteUsers = userHasPermission(Permissions.DeleteUsers);

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
          ) : (
            <Spinner label='Loading users...' />
          )}
        </Stack>
      </Stack>
    </AppShell>
  );
};
