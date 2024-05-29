import fetch from 'utils/fetch';

export default async (
  jwt: string,
  data: Pick<Auth0User, 'email' | 'name' | 'nickname'> & { password: string; role: Role | '' },
) => {
  try {
    return await fetch('/api/users', {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    console.error('Something went wrong trying to create user', { error });
    throw error;
  }
};
