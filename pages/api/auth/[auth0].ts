/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from 'next';
import { handleAuth, handleProfile, getSession } from '@auth0/nextjs-auth0';

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession(req, res);

    if (!session) {
      await handleProfile(req, res);
      return;
    }

    res.status(200).json({
      ...session.user,
      accessToken: session.accessToken,
      accessTokenScope: session.accessTokenScope,
      accessTokenExpiresAt: session.accessTokenExpiresAt,
      idToken: session.idToken,
      token_type: session.token_type,
    });
  } catch (error: any) {
    res.status(error.status || 400).end(error.message);
  }
};

export default handleAuth({ profile });
