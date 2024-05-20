import type { ComponentType } from 'react';
import { useCallback, useContext, useMemo } from 'react';
import { ModalContext } from 'providers/modal/';
import type { ModalBaseProps } from 'providers/modal/types';

const generateModalKey = (() => {
  let count = 0;
  return () => `${count++}`;
})();

export default <P extends ModalBaseProps>(component: ComponentType<P>) => {
  const context = useContext(ModalContext);
  const key = useMemo(generateModalKey, []);

  if (context === null) {
    throw Error('Called useModal hook outside its context');
  }

  const showModal = useCallback(
    (componentProps: Omit<P, 'opened' | 'onClose'>) =>
      context.showModal(key, component, componentProps as P),
    [component, context, key],
  );

  const hideModal = useCallback(() => context.hideModal(key), [context, key]);

  return [showModal, hideModal] as const;
};
