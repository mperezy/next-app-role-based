import type { Db } from 'mongodb';
import { databasePromise } from 'utils/mongo-db-connection';

const USERS_COLLECTION = 'auth0_tokens';

const accessTokenCollection = (database: Db) => database.collection(USERS_COLLECTION);

type TokenDTO = {
  accessToken: 'accessToken';
  token: string;
};

export const insertToken = async (token: TokenDTO['token']) => {
  try {
    const database = await databasePromise();

    if (database) {
      await accessTokenCollection(database)
        .insertOne({ accessToken: 'accessToken', tokenObject: token })
        .then((result) => result);
    }
  } catch (error) {
    console.error('**** Error on insert access token: ', { error });
  }
};

export const getToken = async () => {
  try {
    const database = await databasePromise();

    if (database) {
      return accessTokenCollection(database).findOne<TokenDTO>({ accessToken: 'accessToken' });
    }
  } catch (error) {
    console.error('**** Error on get access token: ', { error });
  }
};

export const updateToken = async (token: TokenDTO['token']) => {
  try {
    const database = await databasePromise();

    if (database) {
      await accessTokenCollection(database).updateOne(
        { accessToken: 'accessToken' },
        {
          $set: {
            token,
          },
        },
      );
    }
  } catch (error) {
    console.error('**** error on update access token: ', { error });
  }
};
