import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import handler from './Generate_Project.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log("🔐 Keys:", {
  OPENAI: process.env.OPENAI_API_KEY?.slice(0, 10) + "...",
  NEWS: process.env.NEWSAPI_KEY?.slice(0, 5) + "...",
  UNSPLASH: process.env.UNSPLASH_ACCESS_KEY?.slice(0, 5) + "...",
  GOOGLE: process.env.GOOGLE_SEARCH_API_KEY?.slice(0, 5) + "...",
});

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('✅ Backend server is up and running!');
});

// Only one route
app.post('/api/generate', async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error("❌ Error in /api/generate route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the app for Vercel serverless function
export default app;

// Start the server if not using serverless (for local testing)
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
