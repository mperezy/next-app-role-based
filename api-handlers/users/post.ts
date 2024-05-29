import type { NextApiRequest, NextApiResponse } from 'next';
import validateRequest from 'api-handlers/validate-request';
import verifyRolePermissions from 'api-handlers/verify-role-permissions';
import { createUser } from 'lib/database/user';
import { Permissions } from 'permissions';
import fetch from 'utils/fetch';
import getAccessToken from 'utils/get-access-token';
import parseError from 'utils/parse-error';

const errorTypeParser = (error: string, statusCode?: number) => {
  const errorMessage = error.split(': ')[1];

  if (statusCode === 409) {
    return {
      field: 'email',
      message: error,
    };
  }

  if (error.toLowerCase().includes('password')) {
    return {
      field: 'password',
      message: errorMessage,
    };
  }

  return {
    field: 'unknown',
    message: error,
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateRequest(req, res);
    await verifyRolePermissions(req, res, Permissions.CreateUsers);

    const body = (() => {
      const { body } = req;
      const { email, name, nickname, password } = JSON.parse(body);

      return {
        email,
        name,
        nickname,
        password,
        connection: 'Username-Password-Authentication',
      };
    })();

    const accessToken = await getAccessToken();

    const response = await fetch<Auth0User>(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    await createUser({ userId: response.user_id, role: JSON.parse(req.body).role });

    res.status(201).json({ response });
  } catch (error) {
    const fetchError = error as FetchError;
    console.error('**** [POST] /api/users', { error: fetchError });

    if (fetchError.cause.statusCode) {
      if (fetchError.cause.statusCode! >= 400) {
        res.status(fetchError.cause.statusCode!).json({
          statusCode: fetchError.cause.statusCode,
          ...errorTypeParser(fetchError.message, fetchError.cause.statusCode),
        });

        return;
      }
    }

    res.status(500).json({ status: 500, message: parseError(error).message });
  }
};
