import express from 'express';
import { createShortUrl, redirectToUrl } from '../controllers/url.js';

const router = express.Router();

// Route to create a new shortened URL
router.post('/url', createShortUrl);

// Route to handle redirection based on miniId
router.get('/:miniId', redirectToUrl);

export default router;
