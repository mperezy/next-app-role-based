import { useCallback, useEffect, useState } from 'react';
import { useAuth0User } from 'providers/auth0-provider';

export default () => {
  const {
    user: { accessToken },
  } = useAuth0User();
  const [users, setUsers] = useState<Auth0User[]>();

  const refetch = useCallback(
    () =>
      fetch('/api/users', { headers: { Authorization: `Bearer ${accessToken}` } })
        .then<{ users: Auth0User[] }>((res) => res.json())
        .then(({ users }) => setUsers(users)),
    [accessToken],
  );

  useEffect(() => {
    refetch().then();
  }, [refetch]);

  return { users, refetch };
};
