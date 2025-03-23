import { ObjectId } from 'mongodb';

// Function to create a new URL document with a custom ObjectId
export async function createUrl(client, miniId, redirectedId) {
    const db = client.db('url-shortner');
    const urlsCollection = db.collection('urls');

    // Create the new URL document
    const newUrl = {
        miniId,
        redirectedId,
        visitHistory: [],
    };

    try {
        const result = await urlsCollection.insertOne(newUrl);
        const insertedUrl = await urlsCollection.findOne({ _id: result.insertedId });
        return insertedUrl;
    } catch (error) {
        console.error('Error creating URL:', error);
        throw error;
    }
}

// Function to find a URL document by miniId
export async function findUrl(client, miniId) {
    const db = client.db('url-shortner');
    const urlsCollection = db.collection('urls');

    try {
        const url = await urlsCollection.findOne({ miniId });
        return url;
    } catch (error) {
        console.error('Error finding URL:', error);
        throw error;
    }
}

// Function to update visit history for a URL
export async function updateVisitHistory(client, miniId) {
    const db = client.db('url-shortner');
    const urlsCollection = db.collection('urls');

    try {
        const result = await urlsCollection.updateOne(
            { miniId },
            { $push: { visitHistory: new Date() } }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Error updating visit history:', error);
        throw error;
    }
}
