const express = require("express");
const router = express.Router();
const { handleGenerateShortUrl } = require("../controllers/url.js");

router.post("/", handleGenerateShortUrl);

module.exports = router; 
