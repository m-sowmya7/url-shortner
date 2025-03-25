import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client = null;

// MongoDB connection function
export async function connectToMongoDb() {
  const uri = process.env.MONGO_DB_CONNECT;

  if (!uri) {
    throw new Error('MongoDB URI is undefined. Please check your .env file.');
  }

  // Return existing client if already connected
  if (client) {
    return client;
  }

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 100000, // Server selection timeout
    connectTimeoutMS: 45000,         // Connection timeout
    socketTimeoutMS: 45000,          // Socket timeout
  });

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    return client;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error.message);
    throw error;
  }
}

// ✅ MongoDB middleware to attach client to req
export async function mongoMiddleware(req, res, next) {
  try {
    const client = await connectToMongoDb();
    req.client = client;
    next();
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
}
