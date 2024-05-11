import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  AppShell,
  Box,
  Burger,
  ColorSwatch,
  Divider,
  em,
  Flex,
  Image,
  NavLink,
  Stack,
  Text,
} from '@mantine/core';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';
import routes from 'components/app-shell/routes';
import UserDropdown from 'components/user-dropdown';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  isDBConnected: boolean;
};

export default ({ children, isDBConnected }: Props) => {
  const { route } = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const [navbarOpened, setNavbarOpened] = useLocalStorage({
    key: 'navbar-opened',
    getInitialValueInEffect: false,
    defaultValue: false,
  });

  return (
    <AppShell
      header={{ height: '4rem' }}
      navbar={{
        width: '20rem',
        breakpoint: 'sm',
        collapsed: { mobile: !navbarOpened, desktop: !navbarOpened },
      }}
    >
      <AppShell.Header>
        <Flex h='100%' align='center' justify='space-between' px='2rem'>
          <Flex align='center' gap='.5rem'>
            <Burger
              color='#FFF'
              opened={navbarOpened}
              onClick={() => setNavbarOpened((prevState) => !prevState)}
            />
            <Image
              alt='Logo'
              src='/images/nextjs-icon.png'
              width={40}
              height={40}
              style={{ cursor: 'pointer' }}
            />
          </Flex>
          <UserDropdown />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar px='md' py='xl' style={{ justifyContent: 'space-between' }}>
        <Stack gap='sm'>
          {routes.map(({ href, title, icon }, index, arr) => (
            <Stack gap='sm' key={index}>
              <NavLink
                active={href === route}
                component={Link}
                href={href}
                label={title}
                leftSection={icon}
                py='sm'
                style={{ borderRadius: '.5rem' }}
                onClick={() => {
                  if (isMobile) {
                    setNavbarOpened(false);
                  }
                }}
              />
              {index < arr.length - 1 && <Divider color='#CDCDCD' />}
            </Stack>
          ))}
        </Stack>

        <Flex align='center' columnGap='.5rem' px='sm'>
          <Text fw={500}>DB Status:</Text>
          <ColorSwatch
            color={isDBConnected ? 'green' : 'red'}
            w='.75rem'
            h='.75rem'
            miw='.75rem'
            mih='.75rem'
            withShadow
          ></ColorSwatch>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main
        w='100%'
        pt={0}
        mt='var(--app-shell-header-height)'
        mih='calc(100dvh - var(--app-shell-header-height))'
        h={'calc(100dvh - var(--app-shell-header-height))'}
      >
        <Box w='100%' h='100%' p='xl' style={{ overflow: 'auto' }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
