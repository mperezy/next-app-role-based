import { useCallback } from 'react';
import type Permissions from 'permissions/permissions';
import { permissionsMap } from 'permissions/permissions';
import { useAuth0User } from 'providers/auth0-provider';

type Result = {
  userHasPermission: (permissions: Permissions[] | Permissions) => boolean;
};

export default (): Result => {
  const {
    user: { role },
  } = useAuth0User();

  const userHasPermission = useCallback(
    (permissions: Permissions[] | Permissions) => {
      const permissionsArr = Array.isArray(permissions) ? permissions : [permissions];

      return permissionsArr.some((permission) => permissionsMap[role].includes(permission));
    },
    [role],
  );

  return { userHasPermission };
};
