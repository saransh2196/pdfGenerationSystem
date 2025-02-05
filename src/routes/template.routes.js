import express from "express";
import Template from "../models/template.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, content } = req.body;
    const template = new Template({ name, content });
    await template.save();
    res.status(201).json({ message: "Template saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
