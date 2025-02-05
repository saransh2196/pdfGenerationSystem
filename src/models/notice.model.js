import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  recipientName: String,
  email: String,
  phone: String,
  data: Object, // Dynamic data for placeholders
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
});

export default mongoose.model("Notice", NoticeSchema);
