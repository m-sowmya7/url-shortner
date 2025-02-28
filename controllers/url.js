import { generate } from "shortid";
import URL from "../models/url.js";
export async function handleGenerateShortUrl(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const shortId = generate(); 
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
