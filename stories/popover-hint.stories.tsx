import PopoverHintComp from 'components/popover-hint';
import ContextMock from './context-mock';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@mantine/core';

const meta = {
  title: 'App/PopoverHint',
  component: PopoverHintComp,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [ContextMock],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PopoverHintComp>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ChildrenDisabled: Story = {
  args: {
    children: <Button disabled>Click me</Button>,
    disabled: false,
    text: 'This popover text will be rendered.',
  },
};

export const ChildrenEnabled: Story = {
  args: {
    children: <Button>Click me</Button>,
    disabled: true,
    text: 'This popover text will be rendered.',
  },
};
