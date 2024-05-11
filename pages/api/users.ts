import type { NextApiRequest, NextApiResponse } from 'next';
import { jwtDecode } from 'jwt-decode';
import { getToken, insertToken, updateToken } from 'lib/database/auth-token';

const parseError = (error: unknown) =>
  error instanceof Error ? error : { status: 500, message: 'An unknown error occurred.' };

const getAccessToken = async () => {
  const tokenFromDB = await getToken();

  if (tokenFromDB) {
    const now = new Date();
    const token = jwtDecode(tokenFromDB.token); // JSON.parse(tokenFromDB.token);
    const { exp } = token;
    const tokenExpirationDate = new Date(Number(exp) * 1000);

    if (tokenExpirationDate < now) {
      console.log('**** Exists a token in DB but is expired.');
      const auth0Token = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.AUTH0_M2M_CLIENT_ID,
          client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
          audience: process.env.AUTH0_IDENTIFIER,
          grant_type: 'client_credentials',
        }),
      }).then((res) => res.json());

      await updateToken(auth0Token.access_token);

      return auth0Token.access_token;
    }

    console.log('**** Exists a token in DB and it is not expired.');

    return tokenFromDB.token;
  }

  console.log('**** Not exists a token in DB so it will be requested to Auth0.');

  // This should happen just once when app.auth0_token is empty
  const auth0Token = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AUTH0_M2M_CLIENT_ID,
      client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
      audience: process.env.AUTH0_IDENTIFIER,
      grant_type: 'client_credentials',
    }),
  }).then((res) => res.json());

  await insertToken(auth0Token.access_token);

  return auth0Token.access_token;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = await getAccessToken();

    const users = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => result);

    res.status(200).json({ users });
  } catch (error) {
    console.log('**** Error on get users: ', { error });
    res.status(500).json({ statusCode: 500, message: parseError(error).message });
  }
};
