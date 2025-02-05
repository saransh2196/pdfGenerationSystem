import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import Notice from "../models/notice.model.js";

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

  const fileName = `Notice_${noticeId}.pdf`;
  const filePath = path.join(pdfDir, fileName);

  await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  return fileName;
};
