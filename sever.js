import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.gemini.com/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: userMessage
      })
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
