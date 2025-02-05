import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import templateRoutes from "./routes/template.routes.js";
import noticeRoutes from "./routes/notice.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import path from "path";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cors());

// Connect to database
connectDB();

// API Routes
app.use("/templates", templateRoutes);
app.use("/notices", noticeRoutes);
app.use("/generate-pdf", pdfRoutes);

// Serve PDFs as static files
app.use("/pdfs", express.static(path.join("public", "pdfs")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
