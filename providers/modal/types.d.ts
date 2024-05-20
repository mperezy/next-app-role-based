import type { ComponentType } from 'react';

type ModalBaseProps = {
  opened: boolean;
  onClose: () => void;
};

type ModalState<P extends object> = {
  opened: boolean;
  component: ComponentType<P>;
  componentProps: P;
};
