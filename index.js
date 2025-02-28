const express = require('express');
const app = express();
const { connectToMongoDb } = require('./mongo');
const urlRoute = require('./routes/url');
const URL = require('./models/url')
const PORT = 8001;

connectToMongoDb('mongodb://127.0.0.1:27017/url-shortner').then(console.log('Connected to mongoDB'));

app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { miniId: shortId }, // Find document by shortId
            { $push: { visitHistory: { timestamp: Date.now() } } }, // Log visit
            { new: true } // Return updated document
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.redirect(entry.redirectedId); //from controllers in newUrl
    } catch (error) {
        console.error("Error handling redirect:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));