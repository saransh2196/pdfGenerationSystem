import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: String,
  content: { type: String, required: true },
});

export default mongoose.model("Template", TemplateSchema);
