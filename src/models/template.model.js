import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: String,
  content: { type: String, required: true }, // HTML template with placeholders
});

export default mongoose.model("Template", TemplateSchema);
