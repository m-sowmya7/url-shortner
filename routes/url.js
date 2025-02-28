import { Router } from "express";
const router = Router();
import { handleGenerateShortUrl } from '../controllers/url.js';

router.post("/", handleGenerateShortUrl);

export default router; 
