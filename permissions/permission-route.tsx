import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Center } from '@mantine/core';
import AlertModal from 'components/alert-modal';
import type { Path } from 'components/app-shell/routes';
import Spinner from 'components/spinner';
import type { Permissions } from 'permissions';
import { usePermissions } from 'permissions';
import useModal from 'providers/modal/use-modal';

type Props = {
  alertMessage: string;
  children: ReactNode;
  permissions: Permissions[] | Permissions;
  redirectTo?: Path;
};

export default ({ alertMessage, children, permissions, redirectTo = '/' }: Props) => {
  const router = useRouter();
  const [openAlertModal] = useModal(AlertModal);
  const { userHasPermission } = usePermissions();
  const hasPermission = userHasPermission(permissions);

  useEffect(() => {
    if (!hasPermission) {
      openAlertModal({
        title: 'Not enough permissions',
        description: `${alertMessage}\n You'll be redirected to home.`,
        onConfirm: () => router.replace(redirectTo).then(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  if (hasPermission) return children;

  return (
    <Center h='100%'>
      <Spinner label='Loading page...' />
    </Center>
  );
};
