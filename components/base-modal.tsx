import type { ReactNode } from 'react';
import { Modal } from '@mantine/core';
import type { ModalBaseProps } from 'providers/modal/types';

type Props = ModalBaseProps & { title: string; children: ReactNode };

export default ({ children, title, ...rest }: Props) => (
  <Modal
    {...rest}
    centered
    closeOnClickOutside={false}
    closeOnEscape
    withCloseButton={false}
    keepMounted={false}
    title={title}
    padding='xl'
    overlayProps={{
      backgroundOpacity: 0.55,
      blur: 4,
    }}
  >
    {children}
  </Modal>
);
