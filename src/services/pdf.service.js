import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import Notice from "../models/notice.model.js";

// Ensure the pdfs directory exists
const pdfDir = path.join("public", "pdfs");
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

export const generatePDF = async (noticeId) => {
  const notice = await Notice.findById(noticeId).populate("templateId");
  if (!notice) throw new Error("Notice not found");

  let htmlContent = notice.templateId?.content || "";
  for (let key in notice.data) {
    htmlContent = htmlContent.replace(
      new RegExp(`{{${key}}}`, "g"),
      notice.data[key]
    );
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Define file path
  const fileName = `Notice_${noticeId}.pdf`;
  const filePath = path.join(pdfDir, fileName);

  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  return fileName; // Return only the filename, not the full path
};

// import puppeteer from "puppeteer";
// import Notice from "../models/notice.model.js";
// import Template from "../models/template.model.js";

// export const generatePDF = async (noticeId) => {
//   const notice = await Notice.findById(noticeId).populate("templateId");

//   if (!notice) throw new Error("Notice not found");

//   let htmlContent = notice.templateId?.content || "";
//   if (!htmlContent) throw new Error("Template content is empty!");

//   // Replace placeholders with actual data
//   for (let key in notice.data) {
//     htmlContent = htmlContent.replace(
//       new RegExp(`{{${key}}}`, "g"),
//       notice.data[key]
//     );
//   }

//   console.log("🔹 Final HTML Content:", htmlContent); // Debugging log

//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();

//   // Log any errors during rendering
//   page.on("console", (msg) => console.log("🔹 Browser Log:", msg.text()));

//   await page.setContent(htmlContent, { waitUntil: "networkidle0" });
//   const pdfBuffer = await page.pdf({ format: "A4" });

//   await browser.close();
//   return pdfBuffer;
// };
