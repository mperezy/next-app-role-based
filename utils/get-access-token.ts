import { jwtDecode } from 'jwt-decode';
import { getToken, insertToken, updateToken } from 'lib/database/auth-token';

export default async (): Promise<string> => {
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
