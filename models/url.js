import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    miniId: { type: String, required: true, unique: true },
    redirectedId: { type: String, required: true },
    visitHistory: [{ type: Date }]
});

const URL = model("URL", urlSchema);
export default URL;
