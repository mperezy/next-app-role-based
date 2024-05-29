export default async (jwt: string, userId: string) => {
  try {
    return await fetch(`/api/users?userId=${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    console.error('Something went wrong trying to delete user', { error });
    throw error;
  }
};
