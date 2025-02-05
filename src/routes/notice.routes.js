import express from "express";
import Notice from "../models/notice.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { recipientName, email, phone, data, templateId } = req.body;
    const notice = new Notice({
      recipientName,
      email,
      phone,
      data,
      templateId,
    });
    await notice.save();
    res.status(201).json({ message: "Notice saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().populate("templateId");
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
