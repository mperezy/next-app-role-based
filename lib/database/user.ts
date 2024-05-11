import type { Db } from 'mongodb';
import { databasePromise } from 'utils/mongo-db-connection';

const USERS_COLLECTION = 'users';

type Role = 'Admin' | 'Moderator' | 'Viewer';

type UserDTO = {
  userId: string;
  role?: Role;
};

const userCollection = (database: Db) => database.collection(USERS_COLLECTION);

export const createUser = async (user: UserDTO) => {
  try {
    const database = await databasePromise();

    if (database) {
      await userCollection(database)
        .insertOne(user)
        .then((result) => result);
    }
  } catch (error) {
    console.error('**** Error on create user: ', { error });
  }
};

export const getUserById = async (userId: string) => {
  try {
    const database = await databasePromise();

    if (database) {
      return userCollection(database).findOne<UserDTO>({ userId });
    }
  } catch (error) {
    console.error('**** Error on get user by id: ', { error });
  }
};

export const assignRoleToUser = async (userId: string, role: Role) => {
  console.log({ userId, role });
  try {
    const database = await databasePromise();

    if (database) {
      await userCollection(database).updateOne({ userId }, { $set: { role } });
    }
  } catch (error) {
    console.error('**** Error on assign role to user: ', { error });
  }
};
