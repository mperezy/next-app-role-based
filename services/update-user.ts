import fetch from 'utils/fetch';

export default async (
  jwt: string,
  data: Pick<Auth0User, 'email' | 'name' | 'nickname'> & {
    userId: string;
    updatePassword: boolean;
    password: string;
    role: Role | '';
  },
) => {
  try {
    return await fetch('/api/users', {
      method: 'PATCH',
      body: data,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    console.error('Something went wrong trying to update user', { error });
    throw error;
  }
};
