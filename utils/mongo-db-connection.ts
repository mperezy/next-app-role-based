import clientPromise from 'lib/mongodb';

export const databasePromise = async () => {
  try {
    const mongoClient = await clientPromise();

    return mongoClient.db(process.env.MONGO_ROOT_DATABASE);
  } catch (error) {
    console.error('**** Error on get database: ', { error });
  }
};

export default async () => {
  try {
    await clientPromise();
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};
