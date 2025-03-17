// import express, { json } from 'express';
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.local' });
// const app = express();
// import  {connectToMongoDb}  from './mongo.js';
// import urlRoute from './routes/url.js';
// import URL from './models/url.js';
// const PORT = process.env.PORT || 8001;

// connectToMongoDb(process.env.MONGO_DB_CONNECT)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('MongoDB connection error:', err));

// app.use(json());
// app.use('/url', urlRoute);
// app.use(express.json());

// app.get('/:shortId', async (req, res) => {
//     try {
//         // console.log("Converted timestamp:", new Date(1740746006542)); 

//         const shortId = req.params.shortId;
//         const entry = await URL.findOneAndUpdate(
//             { miniId: shortId }, // Find document by shortId
//             { $push: { visitHistory: Date.now() }  }, // Log visit
//             { new: true } // Return updated document
//         );

//         if (!entry) {
//             return res.status(404).json({ error: "Short URL not found" });
//         }

//         res.redirect(entry.redirectedId); //from controllers in newUrl
//     } catch (error) {
//         console.error("Error handling redirect:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// app.listen(PORT, () => console.log(`Server running at ${PORT}`));

// export default app;

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const urlDatabase = {}; // Store shortened URLs

// POST request to shorten a URL
app.post("/url", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortId = Math.random().toString(36).substr(2, 6);
  urlDatabase[shortId] = longUrl;

  res.json({ shortUrl: `https://url-shortner.vercel.app/${shortId}` });
});

// GET request to retrieve the original URL
app.get("/:miniId", (req, res) => {
  const { miniId } = req.params;
  const longUrl = urlDatabase[miniId];

  if (!longUrl) {
    return res.status(404).json({ error: "Shortened URL not found" });
  }

  res.redirect(longUrl);
});

// Export for Vercel
export default app;
