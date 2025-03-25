import { nanoid } from 'nanoid';
import { createUrl, findUrl, updateVisitHistory } from '../models/url.js';

export async function createShortUrl(req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const miniId = nanoid(6); 

        const client = req.client; // Get MongoDB client from the request (using middleware)

        const result = await createUrl(client, miniId, url);

        return res.status(201).json({
            miniId: result.miniId,
            redirectedId: result.redirectedId,
            visitHistory: result.visitHistory
        });
    } catch (error) {
        console.error('Error creating URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function redirectToUrl(req, res) {
    try {
        const miniId = req.params.miniId;

        const client = req.client; // Get MongoDB client from the request (using middleware)

        const urlDocument = await findUrl(client, miniId);

        if (!urlDocument) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        await updateVisitHistory(client, miniId);

        res.redirect(urlDocument.redirectedId);
    } catch (error) {
        console.error('Error handling redirect:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}