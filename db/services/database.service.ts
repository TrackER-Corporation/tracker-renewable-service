import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { renewable?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  dotenv.config();

  try {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const collection: mongoDB.Collection = db.collection(process.env.COLLECTION!);

    collections.renewable = collection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collection.collectionName}`);
  } catch (error) {
    console.error(error);
  }
}