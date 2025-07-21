import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🔐 Keys:", {
  OPENAI: process.env.OPENAI_API_KEY?.slice(0, 10) + "...",
  UNSPLASH: process.env.UNSPLASH_ACCESS_KEY?.slice(0, 5) + "...",
  GOOGLE: process.env.GOOGLE_SEARCH_API_KEY?.slice(0, 5) + "...",
});

if (!process.env.OPENAI_API_KEY || !process.env.UNSPLASH_ACCESS_KEY || !process.env.GOOGLE_SEARCH_API_KEY) {
  console.error("❌ Missing one or more required API keys in .env");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const googleSearchAPIKey = process.env.GOOGLE_SEARCH_API_KEY;
const googleSearchCX = process.env.GOOGLE_SEARCH_CX;

const fetchGoogleSearchResults = async (query) => {
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${googleSearchAPIKey}&cx=${googleSearchCX}`;

  try {
    const response = await axios.get(url);
    console.log("Google API Response:", response.data);  // Log the full response to check for any issues
    return response.data.items || [];
  } catch (error) {
    console.error("❌ Error fetching Google Search results:", error);
    return [];
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { project } = req.body;
  const result = { sources: [], stock: [], videos: [], tip: "" };

  try {
    // Tip via OpenAI
    const tipPrompt = `Give two helpful, creative sentences on how someone should approach creating the following media project: "${project}". Tone: friendly but smart. End with a suggested more specific search.`;
    const tipResp = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: tipPrompt }],
      temperature: 0.8,
    });
    result.tip = tipResp.choices[0].message.content.trim();

    // Google Custom Search API
    const sources = await fetchGoogleSearchResults(project);
    result.sources = sources.map((src) => ({
      title: src.title,
      url: src.link,
      description: src.snippet || src.title,
    }));

    // Unsplash Images
    const imgRes = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(project)}&count=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const imgJson = await imgRes.json();
    if (Array.isArray(imgJson)) {
      result.stock = imgJson.slice(0, 10).map((i) => ({
        url: i.urls.small,
        full: i.urls.full,
        alt: i.alt_description || project
      }));
    }

    // YouTube Tutorials
    const { default: ytSearch } = await import("youtube-search-api");
    const ytJson = await ytSearch.GetListByKeyword(`${project} tutorial`, false, 20, [{ type: "video" }]);
    if (ytJson.items) {
      result.videos = ytJson.items
        .filter((it) => it.type === "video" && it.id && it.title)
        .slice(0, 5)
        .map((v) => ({
          url: `https://www.youtube.com/watch?v=${v.id}`,
          title: v.title,
          thumbnail: `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`
        }));
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Error in generate.js:", err);
    res.status(500).json({ error: "AI or media generation failed." });
  }
}
