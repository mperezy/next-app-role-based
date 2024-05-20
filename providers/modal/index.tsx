/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType, ReactNode } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';
import type { ModalBaseProps, ModalState } from 'providers/modal/types';

export const ModalContext = createContext<{
  showModal: <P extends ModalBaseProps>(
    key: string,
    component: ComponentType<P>,
    componentProps: P,
  ) => void;
  hideModal: (key: string) => void;
} | null>(null);

export default ({ children }: { children: ReactNode }) => {
  const [modalsConfig, setConfig] = useState<Record<string, ModalState<any>>>({});

  const showModal = useCallback(function <P extends object>(
    modalKey: string,
    component: ComponentType<P>,
    modalData: P,
  ) {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [modalKey]: {
        opened: true,
        component,
        componentProps: modalData,
      },
    }));
  }, []);

  const hideModal = useCallback(
    (modalKey: string) => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [modalKey]: { ...prevConfig[modalKey], opened: false },
      }));
    },
    [setConfig],
  );

  const contextValue = useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {Object.keys(modalsConfig).map((modalKey) => {
        const { component: Component, opened, componentProps } = modalsConfig[modalKey];

        return (
          <Component
            key={modalKey}
            onClose={() => hideModal(modalKey)}
            opened={opened}
            {...componentProps}
          />
        );
      })}
    </ModalContext.Provider>
  );
};
