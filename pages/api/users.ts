import type { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, postUser, deleteUser, patchUser } from 'api-handlers/users';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    await getUsers(req, res);

    return;
  }

  if (method === 'POST') {
    await postUser(req, res);

    return;
  }

  if (method === 'DELETE') {
    await deleteUser(req, res);

    return;
  }

  if (method === 'PATCH') {
    await patchUser(req, res);

    return;
  }

  res.status(404).json({ status: 404, message: 'Method not implemented' });
};
