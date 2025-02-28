const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const shortId = shortid.generate(); 
        const newUrl = await URL.create({
            miniId: shortId,
            redirectedId: url,
            visitHistory: [],
        });

        res.status(201).json({ miniId: newUrl.miniId });
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { handleGenerateShortUrl };
