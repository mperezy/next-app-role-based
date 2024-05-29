import { useCallback, useEffect, useState } from 'react';
import { useAuth0User } from 'providers/auth0-provider';
import fetchUsers from 'services/fetch-users';

type UseUserState = {
  refetch: boolean;
  loading: boolean;
  error?: FetchError;
  users?: Auth0User[];
};

const defaultState: UseUserState = {
  refetch: true,
  loading: true,
  error: undefined,
  users: undefined,
};

export default (): Omit<UseUserState, 'refetch'> & { refetch: () => void } => {
  const {
    user: { accessToken },
  } = useAuth0User();
  const [{ refetch, loading, error, users }, setState] = useState<UseUserState>(defaultState);

  const fetchData = useCallback(
    () =>
      new Promise<Pick<UseUserState, 'users'>>((resolve, reject) =>
        setTimeout(
          () =>
            fetchUsers(accessToken)
              .then(({ users }) => resolve({ users }))
              .catch((error) => reject(error)),
          1500,
        ),
      ),
    [accessToken],
  );

  useEffect(() => {
    const effect = async () => {
      try {
        if (refetch) {
          const { users } = await fetchData();
          setState((prevState) => ({ ...prevState, users }));
        }
      } catch (error) {
        setState((prevState) => ({ ...prevState, error: error as FetchError }));
      } finally {
        setState((prevState) => ({ ...prevState, refetch: false, loading: false }));
      }
    };

    effect().then();
  }, [fetchData, refetch]);

  useEffect(() => {
    if (refetch) setState((prevState) => ({ ...prevState, users: undefined, loading: true }));
  }, [refetch]);

  return {
    users,
    loading,
    error,
    refetch: () => setState((prevState) => ({ ...prevState, refetch: true })),
  };
};
