import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini SDK initialized successfully server-side.");
  } catch (error) {
    console.error("Failed to initialize Gemini SDK:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found, running in resilient fallback mode.");
}

// Resilient fallback stories
const fallbackStories = [
  {
    title: "Bé và Quả Cam",
    storyLines: [
      { text: "Mẹ cho bé quả cam.", words: ["mẹ", "cho", "bé", "quả", "cam"] },
      { text: "Quả cam có màu cam.", words: ["quả", "cam", "có", "màu", "cam"] },
      { text: "Bé chia cho bà một nửa.", words: ["bé", "chia", "cho", "bà", "một", "nửa"] }
    ],
    question: {
      text: "Quả cam có màu gì?",
      options: ["Màu đỏ", "Màu cam", "Màu xanh"],
      answer: "Màu cam"
    }
  },
  {
    title: "Chú Gà Trống",
    storyLines: [
      { text: "Chú gà trống gáy vang.", words: ["chú", "gà", "trống", "gáy", "vang"] },
      { text: "Ò ó o o!", words: ["ò", "ó", "o", "o"] },
      { text: "Bé nghe tiếng gà liền thức dậy.", words: ["bé", "nghe", "tiếng", "gà", "liền", "thức", "dậy"] }
    ],
    question: {
      text: "Chú gà trống gáy thế nào?",
      options: ["Cục tác cục tác", "Gâu gâu", "Ò ó o o"],
      answer: "Ò ó o o"
    }
  },
  {
    title: "Cá Nhỏ Bơi Xuồng",
    storyLines: [
      { text: "Bé đi chơi hồ sen.", words: ["bé", "đi", "chơi", "hồ", "sen"] },
      { text: "Hồ có cá nhỏ bơi.", words: ["hồ", "có", "cá", "nhỏ", "bơi"] },
      { text: "Cá nhỏ thích bé lắm.", words: ["cá", "nhỏ", "thích", "bé", "lắm"] }
    ],
    question: {
      text: "Hồ sen có con gì bơi?",
      options: ["Con cá nhỏ", "Con chim sẻ", "Con mèo vàng"],
      answer: "Con cá nhỏ"
    }
  }
];

// Resilient fallback game recommendations
const fallbackRecommendations = {
  easy: {
    title: "Tìm chữ cái còn thiếu",
    description: "Giúp bé tìm chữ cái đơn giản bị ẩn giấu dưới những bông hoa.",
    tips: "Hãy hướng dẫn bé đọc to chữ cái trước khi chọn nhé!"
  },
  medium: {
    title: "Nối hình với từ tương ứng",
    description: "Ghép các từ như 'BÉ', 'CÁ', 'BÀ' với hình ảnh minh họa thích hợp.",
    tips: "Bé có thể nghe đánh vần trước để dễ dàng chọn lựa hình ảnh."
  },
  hard: {
    title: "Xếp gạch ghép chữ cái",
    description: "Sắp xếp thứ tự các chữ cái 'b' - 'e' - 'sắc' để tạo thành chữ 'bé'.",
    tips: "Cực kỳ thích hợp cho rèn luyện khả năng tư duy logic và ghép vần."
  }
};

// API Endpoint to generate a story
app.post("/api/gemini/generate-story", async (req, res) => {
  const { words = ["bé", "gà", "mẹ", "bà"], level = "mầm non" } = req.body;

  if (!ai) {
    // Return a random fallback story
    const randomIndex = Math.floor(Math.random() * fallbackStories.length);
    return res.json({
      success: true,
      source: "fallback",
      story: fallbackStories[randomIndex]
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Hãy tạo một câu chuyện ngắn bằng tiếng Việt dành cho trẻ em mầm non học đánh vần (4-6 tuổi) sử dụng các từ khóa sau: ${words.join(", ")}.
      Yêu cầu:
      1. Câu chuyện tối đa 3-4 câu cực kỳ đơn giản, dễ hiểu, các từ ngắn gọn, thích hợp cho bé đánh vần.
      2. Tạo một câu hỏi trắc nghiệm vui nhộn về nội dung câu chuyện với 3 đáp án lựa chọn và đáp án đúng rõ ràng.
      3. Định dạng đầu ra phải là JSON phù hợp với schema yêu cầu.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Tiêu đề câu chuyện" },
            storyLines: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING, description: "Nội dung câu thơ hoặc câu văn" },
                  words: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Tách từng từ riêng lẻ trong câu để bé có thể chạm và nghe"
                  }
                },
                required: ["text", "words"]
              }
            },
            question: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING, description: "Câu hỏi về câu chuyện" },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Chính xác 3 tùy chọn câu trả lời"
                },
                answer: { type: Type.STRING, description: "Câu trả lời đúng khớp hoàn toàn với một trong các tùy chọn" }
              },
              required: ["text", "options", "answer"]
            }
          },
          required: ["title", "storyLines", "question"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    return res.json({
      success: true,
      source: "gemini",
      story: data
    });
  } catch (error) {
    console.error("Error generating story with Gemini:", error);
    const randomIndex = Math.floor(Math.random() * fallbackStories.length);
    return res.json({
      success: true,
      source: "fallback-error",
      story: fallbackStories[randomIndex]
    });
  }
});

// API Endpoint to recommend a game
app.post("/api/gemini/recommend-game", async (req, res) => {
  const { starsCount = 0, currentProgress = "easy" } = req.body;

  if (!ai) {
    const levelKey = starsCount > 15 ? "hard" : starsCount > 5 ? "medium" : "easy";
    return res.json({
      success: true,
      source: "fallback",
      recommendation: fallbackRecommendations[levelKey]
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Đề xuất một trò chơi giáo dục và mẹo học tập cá nhân hóa cho bé 4-6 tuổi học đánh vần tiếng Việt. 
      Thông tin học tập hiện tại: Bé đã đạt được ${starsCount} ngôi sao, mức độ học tập hiện tại là ${currentProgress}.
      Hãy trả về một đề xuất trò chơi thú vị theo định dạng JSON với schema sau.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Tên trò chơi được đề xuất" },
            description: { type: Type.STRING, description: "Mô tả luật chơi ngắn gọn, dễ thương cho phụ huynh và bé đọc" },
            tips: { type: Type.STRING, description: "Mẹo nhỏ giúp bé học tốt hơn dựa trên số sao hiện tại" }
          },
          required: ["title", "description", "tips"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    return res.json({
      success: true,
      source: "gemini",
      recommendation: data
    });
  } catch (error) {
    console.error("Error recommending game with Gemini:", error);
    const levelKey = starsCount > 15 ? "hard" : starsCount > 5 ? "medium" : "easy";
    return res.json({
      success: true,
      source: "fallback-error",
      recommendation: fallbackRecommendations[levelKey]
    });
  }
});

// API Endpoint for proxying Google Translate TTS for highly accurate Vietnamese voice
app.get("/api/tts", async (req, res) => {
  const { text } = req.query;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text parameter is required and must be a string." });
  }

  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text.trim())}`;
    
    const googleResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    if (!googleResponse.ok) {
      throw new Error(`Google Translate TTS responded with status: ${googleResponse.status}`);
    }

    const arrayBuffer = await googleResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 24 hours
    return res.send(buffer);
  } catch (error) {
    console.error("TTS Proxy Error:", error);
    return res.status(500).json({ error: "Failed to generate text-to-speech." });
  }
});

// Mount Vite middleware for development, serve static files for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
