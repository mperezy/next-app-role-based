import fetch from 'utils/fetch';

type Users = {
  users: Auth0User[];
};

export default async (jwt: string): Promise<Users> => {
  try {
    return await fetch<Users>('/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    console.error('Something went wrong trying to fetch users', { error });
    throw error;
  }
};
