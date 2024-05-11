import type { MongoClientOptions } from 'mongodb';
import { MongoClient, ServerApiVersion } from 'mongodb';

export default () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (!process.env.MONGO_ROOT_DATABASE) {
    throw new Error(
      'There is no database name initialized in environment variable "MONGO_ROOT_DATABASE"',
    );
  }

  const uri = process.env.MONGODB_URI;
  const options: MongoClientOptions = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  };

  const client = new MongoClient(uri, options);

  return client.connect();
};
