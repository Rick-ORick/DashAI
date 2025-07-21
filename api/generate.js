import handler from './Generate_Project.js';

export default async function(req, res) {
  if (req.method === 'POST') {
    try {
      await handler(req, res);
    } catch (err) {
      console.error("❌ Error in handler:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
