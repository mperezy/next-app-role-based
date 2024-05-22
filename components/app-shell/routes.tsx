import type { ReactNode } from 'react';
import {
  MdGroups,
  MdOutlineAdminPanelSettings,
  MdOutlineHome,
  MdOutlineLocalPolice,
} from 'react-icons/md';
import { Loader } from '@mantine/core';

export type Path = '/' | '/test-loader' | '/users' | '/moderator-page' | '/admin-page';

type Route = {
  href: Path;
  title: string;
  icon: ReactNode;
};

export default [
  {
    href: '/',
    title: 'Home',
    icon: <MdOutlineHome size='1.5rem' />,
  },
  {
    href: '/test-loader',
    title: 'Test Loader',
    icon: <Loader size='1.5rem' />,
  },
  {
    href: '/users',
    title: 'Users',
    icon: <MdGroups size='1.5rem' />,
  },
  {
    href: '/moderator',
    title: 'Moderator page',
    icon: <MdOutlineLocalPolice size='1.5rem' />,
  },
  {
    href: '/admin',
    title: 'Admin page',
    icon: <MdOutlineAdminPanelSettings size='1.5rem' />,
  },
] as Route[];
