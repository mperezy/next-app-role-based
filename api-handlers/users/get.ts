import type { NextApiRequest, NextApiResponse } from 'next';
import validateRequest from 'api-handlers/validate-request';
import { getUserById } from 'lib/database/user';
import getAccessToken from 'utils/get-access-token';
import parseError from 'utils/parse-error';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req, res);

    const accessToken = await getAccessToken();

    const users = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => result);

    const usersWithRole = await Promise.all<Auth0User[]>(
      users.map(async (user: Auth0User) => {
        const userFromDB = await getUserById(user.user_id);

        return { ...user, role: userFromDB?.role };
      }),
    );

    res.status(200).json({ users: usersWithRole });
  } catch (error) {
    console.log('**** Error on get users: ', { error });
    res.status(500).json({ statusCode: 500, message: parseError(error).message });
  }
};
