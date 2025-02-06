📄 Notice PDF Generation System
A Node.js service that dynamically generates PDFs from HTML templates, stores them, and provides a downloadable link.

🚀 Features
✅ Create and store HTML templates for notices.
✅ Generate PDFs dynamically with user-specific data.
✅ Serve PDFs as public links for easy access.
✅ MongoDB for template and notice storage.
✅ Uses Puppeteer to generate high-quality PDFs.

📂 Project Structure

notice-pdf-system/
│── public/
│   ├── pdfs/          # Stores generated PDFs
│── src/
│   ├── config/
│   │   ├── db.js      # MongoDB connection
│   ├── models/
│   │   ├── template.model.js
│   │   ├── notice.model.js
│   ├── routes/
│   │   ├── template.routes.js
│   │   ├── notice.routes.js
│   │   ├── pdf.routes.js
│   ├── services/
│   │   ├── pdf.service.js  # PDF generation logic
│   ├── app.js              # Main server file
│── .env                    # Environment variables (not committed)
│── .gitignore
│── package.json
│── README.md

🔧 Setup & Installation

1️⃣ Clone the Repository
git clone https://github.com/yourusername/notice-pdf-system.git
cd notice-pdf-system
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables
Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=mongodb://localhost:27017/notice-pdf
4️⃣ Start MongoDB (If Running Locally)
mongod
5️⃣ Run the Server
npm start
Server will start at: http://localhost:5000 🚀

🔥 API Documentation

1️⃣ Create a Notice Template
Endpoint: POST /templates
Description: Stores an HTML template for generating PDFs.

Request Body (JSON)
{
  "name": "Loan Payment Reminder",
  "content": "<html><body><h2>Loan Payment Reminder</h2><p>Dear {{recipientName}},</p><p>Your loan of ₹{{amount}} is due on {{dueDate}}.</p></body></html>"
}
Response:
{ "message": "Template saved successfully" }

2️⃣ Create a Notice
Endpoint: POST /notices
Description: Stores recipient-specific data for notice generation.
Request Body (JSON)
{
  "recipientName": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "data": {
    "recipientName": "Rahul Sharma",
    "amount": "50,000",
    "dueDate": "2025-02-10"
  },
  "templateId": "<INSERT_TEMPLATE_ID>"  // You can get template id from mongoDB in the template collection
}
Response:
{ "message": "Notice saved successfully" }

3️⃣ Generate a Notice PDF
Endpoint: POST /generate-pdf
Description: Generates a PDF for a given notice and provides a public download link.
Request Body (JSON)
{ "noticeId": "<INSERT_NOTICE_ID>" }  / You can get notice id from mongoDB in the notice collection
Response:
{
  "message": "PDF Generated",
  "pdfUrl": "http://localhost:5000/pdfs/Notice_65e1ab8f7c4a3a6e5b9e2c31.pdf"
}

🔗 Now, open the pdfUrl in a browser to view/download the PDF.

🔍 Assumptions
MongoDB must be running for the system to work.
HTML templates contain placeholders (e.g., {{name}}), which are replaced with actual values.
The public/pdfs/ directory is created automatically if it does not exist.
Puppeteer is installed properly and works in headless mode.

🛠 Troubleshooting
PDF Not Loading?
Check if the PDF exists in public/pdfs/.
Restart the server and ensure MongoDB is running.

CORS Issue?
Install and enable CORS:
npm install cors

Add this in app.js:
import cors from "cors";
app.use(cors());
MongoDB Connection Fails?
Ensure .env contains a valid MONGO_URI.

Restart MongoDB using:
mongod

📝 To-Do (Future Enhancements)

✅ Store PDFs in AWS S3 instead of local storage.
✅ Implement pagination for fetching notices.
✅ Add authentication using JWT.
