import { useEffect, useState } from 'react';

export default () => {
  const [users, setUsers] = useState<Auth0User[]>();

  useEffect(() => {
    fetch('/api/users')
      .then<{ users: Auth0User[] }>((res) => res.json())
      .then(({ users }) => setUsers(users));
  }, []);

  return users;
};
