import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, Center, Flex, Stack } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import BaseModal from 'components/base-modal';
import ContextMock from './context-mock';

type Props = {
  title: string;
  children: ReactNode;
};

const ModalTest = ({ title, children }: Props) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handleModal = () => setOpened((prevState) => !prevState);

  return (
    <>
      <Button onClick={handleModal}>Open Modal</Button>
      <BaseModal opened={opened} onClose={handleModal} title={title}>
        <Stack>
          {children}
          <Flex justify='flex-end'>
            <Button onClick={handleModal}>Close</Button>
          </Flex>
        </Stack>
      </BaseModal>
    </>
  );
};

const meta = {
  title: 'App/BaseModal',
  component: ModalTest,
  tags: ['autodocs'],
  decorators: [ContextMock],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ModalTest>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    children: <Center>Some Modal Content</Center>,
  },
};
