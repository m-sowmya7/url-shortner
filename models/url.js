const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    miniId: { type: String, required: true, unique: true },
    redirectedId: { type: String, required: true },
    // visitHistory: { type: Array, default: [] }
    visitHistory: { type: [Date], default: [] }
});

const URL = mongoose.model("URL", urlSchema);
module.exports = URL;
