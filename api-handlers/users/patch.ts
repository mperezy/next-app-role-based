import type { NextApiRequest, NextApiResponse } from 'next';
import validateRequest from 'api-handlers/validate-request';
import verifyRolePermissions from 'api-handlers/verify-role-permissions';
import { assignRoleToUser, getUserById } from 'lib/database/user';
import { Permissions } from 'permissions';
import getAccessToken from 'utils/get-access-token';
import parseError from 'utils/parse-error';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req, res);
    await verifyRolePermissions(
      req,
      res,
      [Permissions.UpdateUsers, Permissions.UpdatePasswordUsers],
      true,
    );

    const accessToken = await getAccessToken();
    const { body } = req;
    const bodyParsed = JSON.parse(body);
    const { userId, email, name, nickname, updatePassword, password, role } = bodyParsed;

    const userFromDB = await getUserById(userId);

    if (!userFromDB) {
      res.status(400).json({ status: 400, message: 'User not found' });
      return;
    }

    const userRole = userFromDB.role;

    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        email,
        name,
        nickname,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (response.statusCode && response.statusCode >= 400) {
      res.status(response.statusCode).json({
        status: response.statusCode,
        message: response.message,
      });
      return;
    }

    if (updatePassword) {
      await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          password,
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    }

    if (userRole !== role) {
      await assignRoleToUser(userId, role);
    }

    res.status(200).json({ message: 'User updated.' });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ status: 500, message: parseError(error).message });
  }
};
