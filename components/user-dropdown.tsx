import { useState } from 'react';
import { useRouter } from 'next/router';
import { MdOutlineLogout, MdChevronRight } from 'react-icons/md';
import { Avatar, em, Flex, Menu, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useAuth0User } from 'providers/auth0-provider';
import type { IconBaseProps } from 'react-icons';

export default () => {
  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);
  const router = useRouter();
  const { user } = useAuth0User();
  const [opened, setOpened] = useState<boolean>(false);

  const handleLogout = () => router.push('/api/auth/logout');

  const UserData = ({ color }: { color: IconBaseProps['color'] }) => (
    <>
      <Text c={color} size='sm' fw={700}>
        {user?.name}
      </Text>
      <Text c={color} size='sm'>
        {user?.email}
      </Text>
    </>
  );

  return (
    <Menu
      shadow='md'
      width={isMobile ? '15rem' : '13rem'}
      opened={opened}
      onChange={setOpened}
      offset={13}
    >
      <Menu.Target>
        <Flex align='center' gap={isMobile ? '.5rem' : '1rem'} style={{ cursor: 'pointer' }}>
          <Avatar src={user?.picture} w={40} h={40} />
          <Stack gap={0.25} visibleFrom='sm'>
            <UserData color='#FFF' />
          </Stack>
          <MdChevronRight color='#FFF' style={{ rotate: opened ? '270deg' : '90deg' }} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Stack gap={0.25} hiddenFrom='sm' px='md' py='xs'>
          <UserData color='#000' />
        </Stack>
        <Menu.Divider hiddenFrom='sm'></Menu.Divider>
        <Menu.Item leftSection={<MdOutlineLogout />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
