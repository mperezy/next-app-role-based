import type { NextApiRequest, NextApiResponse } from 'next';
import validateRequest from 'api-handlers/validate-request';
import verifyRolePermissions from 'api-handlers/verify-role-permissions';
import { getUserById } from 'lib/database/user';
import { Permissions } from 'permissions';
import fetch from 'utils/fetch';
import getAccessToken from 'utils/get-access-token';
import parseError from 'utils/parse-error';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req, res);
    await verifyRolePermissions(req, res, Permissions.ViewUsers);

    const accessToken = await getAccessToken();

    const users = await fetch<Auth0User[]>(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const usersWithRole = await Promise.all<Auth0User>(
      users.map(async (user) => {
        const userFromDB = await getUserById(user.user_id);

        return { ...user, role: userFromDB?.role };
      }),
    );

    res.status(200).json({ users: usersWithRole });
  } catch (error) {
    console.log('**** [GET] /api/users', { error });

    res.status((error as FetchError).cause.statusCode ?? 500).json({
      statusCode: (error as FetchError).cause.statusCode ?? 500,
      message: parseError(error).message,
    });
  }
};
