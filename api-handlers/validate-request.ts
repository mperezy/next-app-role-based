import type { NextApiRequest, NextApiResponse } from 'next';
import { jwtDecode } from 'jwt-decode';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req;

  const jwt = headers.authorization?.replaceAll('Bearer ', '');

  // If there is no JWT (access_token) in the request header, throw error response 500
  if (!jwt) {
    res.status(500).json({ status: 500, message: 'Authentication token not provided.' });
    return;
  }

  const tokenDecoded = jwtDecode(jwt);
  const now = new Date();
  const tokenExpirationDate = new Date(Number(tokenDecoded.exp) * 1000);

  // If the JWT does not include the env Auth0 Identifier or, the JWT is expired, throw error response 401
  if (
    !(tokenDecoded.aud as string[])?.includes(process.env.AUTH0_IDENTIFIER!) ||
    tokenExpirationDate < now
  ) {
    res.status(401).json({ status: 401, message: 'No authorized.' });
    return;
  }
};
