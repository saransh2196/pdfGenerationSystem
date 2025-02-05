import express from "express";
import { generatePDF } from "../services/pdf.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { noticeId } = req.body;
    const fileName = await generatePDF(noticeId);

    const pdfUrl = `http://localhost:5000/pdfs/${fileName}`;
    res.json({ message: "PDF Generated", pdfUrl: pdfUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
