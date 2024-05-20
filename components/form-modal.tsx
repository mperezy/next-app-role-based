import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { Box, Button, Flex, Stack } from '@mantine/core';
import BaseModal from 'components/base-modal';
import ConfirmModal from 'components/confirm-modal';
import type { ModalBaseProps } from 'providers/modal/types';
import useModal from 'providers/modal/use-modal';

type Texts = {
  title: string;
  description?: string;
  cancelButton?: string;
  submitButton?: string;
};

type Props = ModalBaseProps & {
  children: ReactNode;
  disabled?: boolean;
  formIsDirty?: boolean;
  loading?: boolean;
  texts: Texts;
  onSubmit: () => Promise<void>;
  resetForm: () => void;
};

export default ({
  children,
  disabled,
  formIsDirty,
  loading,
  texts,
  onSubmit,
  resetForm,
  ...rest
}: Props) => {
  const confirmClose = useConfirmModal(() => {
    resetForm();
    rest.onClose();
  }, formIsDirty);

  return (
    <BaseModal title={texts.title} {...rest}>
      <form onSubmit={onSubmit}>
        <Stack justify='center'>
          <Box>{children}</Box>

          <Flex justify='flex-end' gap='md' mt='lg'>
            <Button variant='light' color='gray' onClick={confirmClose}>
              {texts.cancelButton ?? 'Cancel'}
            </Button>
            <Button type='submit' loading={loading} disabled={disabled}>
              {texts.submitButton ?? 'Submit'}
            </Button>
          </Flex>
        </Stack>
      </form>
    </BaseModal>
  );
};

const useConfirmModal = (onClose: () => void, formIsDirty?: boolean) => {
  const [openConfirmModal, closeConfirmModal] = useModal(ConfirmModal);

  return useCallback(() => {
    if (formIsDirty) {
      openConfirmModal({
        title: 'You have unsaved changes',
        description:
          // eslint-disable-next-line max-len
          'Are you sure want to discard this form?\n Confirm that by clicking out the Confirm button.',
        onConfirm: () => {
          closeConfirmModal();
          onClose();
        },
      });

      return;
    }

    onClose();
  }, [formIsDirty, onClose, openConfirmModal, closeConfirmModal]);
};
