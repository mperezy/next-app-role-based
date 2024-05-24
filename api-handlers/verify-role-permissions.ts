import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import type { Permissions } from 'permissions';
import { roleHasPermissions } from 'permissions';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  permissions: Permissions | Permissions[],
  all?: boolean,
) => {
  const session = await getSession(req, res);

  if (!session || !session.user) {
    return res.status(401).json({ statusCode: 401, message: 'You are not authenticated' });
  }
  const { role } = session.user;

  if (!roleHasPermissions(role, permissions, all)) {
    return res
      .status(403)
      .json({ statusCode: 403, message: 'Not enough permissions for this resource' });
  }
};
