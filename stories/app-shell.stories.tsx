import { Center } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import AppShellComp from 'components/app-shell';
import ContextMock from 'stories/context-mock';

const meta = {
  title: 'App/AppShell',
  component: AppShellComp,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [ContextMock],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AppShellComp>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isDBConnected: true,
    children: <Center h='100%'>Some children here...</Center>,
  },
};
