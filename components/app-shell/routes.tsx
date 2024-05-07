import type { ReactNode } from 'react';
import { MdGroups, MdOutlineHome } from 'react-icons/md';
import { Loader } from '@mantine/core';

type Path = '/' | '/test-loader' | '/users';

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
] as Route[];
