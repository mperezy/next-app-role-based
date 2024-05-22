import type { ModalBaseProps } from 'providers/modal/types';
import { Button, Flex, Stack, Text } from '@mantine/core';
import BaseModal from 'components/base-modal';

type Props = ModalBaseProps & {
  title: string;
  description: string;
  confirmButton?: string;
  onConfirm: () => void;
};

export default ({ title, description, confirmButton, onConfirm, ...rest }: Props) => (
  <BaseModal {...rest} title={title}>
    <Stack>
      <Text>{description}</Text>
      <Flex gap='md' justify='flex-end' mt='lg'>
        <Button onClick={onConfirm}>{confirmButton ?? 'Confirm'}</Button>
      </Flex>
    </Stack>
  </BaseModal>
);
