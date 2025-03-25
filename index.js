// import express from 'express';
// import { connectToMongoDb } from './mongo.js';
// import dotenv from 'dotenv';
// import urlRoutes from './routes/url.js';

// dotenv.config();

// const app = express();
// const PORT = 8001;

// app.use(express.json());

// let client;

// // MongoDB connection
// connectToMongoDb().then((mongoClient) => {
//     client = mongoClient;
//     // console.log('Connected to MongoDB Atlas');
// }).catch((error) => {
//     console.error('Failed to connect to MongoDB Atlas:', error);
//     process.exit(1); 
// });

// // Middleware to make the MongoDB client available for all routes
// app.use((req, res, next) => {
//     req.client = client; 
//     next();
// });

// // Use the routes defined in the routes folder
// app.use(urlRoutes);

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

import express from 'express';
import { connectToMongoDb } from './mongo.js';
import dotenv from 'dotenv';
import urlRoutes from './routes/url.js';
import cors from 'cors'; // If your API will be accessed from a frontend hosted elsewhere
import morgan from 'morgan'; // For logging HTTP requests in production

dotenv.config();

const app = express();


// Use middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

let client;

// MongoDB connection
connectToMongoDb().then((mongoClient) => {
    client = mongoClient;

}).catch((error) => {
    console.error('Failed to connect to MongoDB Atlas:', error);
    process.exit(1); // Exit if connection fails
});

// Middleware to make the MongoDB client available for all routes
app.use((req, res, next) => {
    req.client = client;
    next();
});

// Use the routes defined in the routes folder
app.use(urlRoutes);

// app.listen(8001, () => {
//     console.log('Server is running on http://localhost:8001');
// });

// This handler will be used in Vercel
export default function handler(req, res) {
    app(req, res);
}