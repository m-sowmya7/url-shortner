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

    if (client) {
        return client;
    }

    client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client;
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error);
        throw error;
    }
}
