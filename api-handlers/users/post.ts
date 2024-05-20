import type { NextApiRequest, NextApiResponse } from 'next';
import validateRequest from 'api-handlers/validate-request';
import { createUser } from 'lib/database/user';
import getAccessToken from 'utils/get-access-token';
import parseError from 'utils/parse-error';

const errorTypeParser = (error: string, statusCode: number) => {
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

    const body = (() => {
      const { body } = req;
      const { email, name, nickname, password } = JSON.parse(body);

      return JSON.stringify({
        email,
        name,
        nickname,
        password,
        connection: 'Username-Password-Authentication',
      });
    })();

    const accessToken = await getAccessToken();

    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const userCreated = await response.json();

    if (userCreated.statusCode && userCreated.statusCode >= 400) {
      res.status(userCreated.statusCode).json({
        status: userCreated.statusCode,
        ...errorTypeParser(userCreated.message, userCreated.statusCode),
      });

      return;
    }

    await createUser({ userId: userCreated.user_id, role: JSON.parse(req.body).role });

    res.status(201).json({ userCreated });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ status: 500, message: parseError(error).message });
  }
};
