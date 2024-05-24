import { useCallback } from 'react';
import type { Permissions } from 'permissions';
import { roleHasPermissions } from 'permissions';
import { useAuth0User } from 'providers/auth0-provider';

type Result = {
  userHasPermission: (permissions: Permissions[] | Permissions) => boolean;
};

export default (): Result => {
  const {
    user: { role },
  } = useAuth0User();

  const userHasPermission = useCallback(
    (permissions: Permissions[] | Permissions) => roleHasPermissions(role, permissions),
    [role],
  );

  return { userHasPermission };
};
