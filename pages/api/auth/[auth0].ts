import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session } from '@auth0/nextjs-auth0';
import {
  HandlerError,
  handleAuth,
  handleCallback,
  handleLogin,
  handleProfile,
  getSession,
} from '@auth0/nextjs-auth0';
import { createUser, getUserById } from 'lib/database/user';

const parseError = (error: unknown) =>
  error instanceof HandlerError ? error : { status: 500, message: 'An unknown error occurred.' };

const afterCallback = async (_: NextApiRequest, __: NextApiResponse, session: Session) => {
  const {
    user: { sub: userId },
  } = session;

  const userExists = await getUserById(userId);

  if (!userExists) {
    await createUser({ userId, role: 'Viewer' });
    session.user.role = 'Viewer';
  } else {
    const user = await getUserById(session.user.sub);
    session.user.role = user?.role;
  }

  return session;
};

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleCallback(req, res, { afterCallback });
  } catch (error) {
    res.status(parseError(error).status || 400).end(parseError(error).message);
  }
};

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleLogin(req, res, {
      authorizationParams: {
        audience: process.env.AUTH0_IDENTIFIER ?? '',
      },
    });
  } catch (error) {
    res.status(parseError(error).status || 400).end(parseError(error).message);
  }
};

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
  } catch (error) {
    res.status(parseError(error).status || 400).end(parseError(error).message);
  }
};

export default handleAuth({ callback, login, profile });
