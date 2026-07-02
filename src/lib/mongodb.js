import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('brightmusic');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getVisitsCollection() {
  const { db } = await connectToDatabase();
  return db.collection('visits');
}
