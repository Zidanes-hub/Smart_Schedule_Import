## About This Project
Manually inputting a full semester's course schedule into a calendar is tedious and prone to errors. Smart Schedule Importer solves this problem by providing a user-friendly interface to automate the entire process.

Key Features:
🤖 AI-Powered Parsing: Utilizes the Gemini API to accurately understand and extract key details (course name, time, location) from schedule data.

📅 Google Calendar Integration: Seamlessly connects with your Google account to add events directly to your calendar.

🔁 Automatic Recurring Events: Intelligently sets up weekly recurring events that last for the entire duration of the semester.

⚡ Modern Tech Stack: Built with React, Vite, and TypeScript for a fast, responsive, and type-safe user experience.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
