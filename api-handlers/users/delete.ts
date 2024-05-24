import type { NextApiRequest, NextApiResponse } from 'next';
import validateRequest from 'api-handlers/validate-request';
import verifyRolePermissions from 'api-handlers/verify-role-permissions';
import { deleteUser } from 'lib/database/user';
import { Permissions } from 'permissions';
import getAccessToken from 'utils/get-access-token';
import parseError from 'utils/parse-error';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { userId },
    } = req;
    validateRequest(req, res);
    await verifyRolePermissions(req, res, Permissions.DeleteUsers);

    const accessToken = await getAccessToken();

    await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await deleteUser(userId as string);

    res.status(204).json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ status: 500, message: parseError(error).message });
  }
};
