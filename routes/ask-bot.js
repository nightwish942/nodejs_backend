import express from 'express';
const router = express.Router();
import { Configuration, OpenAIApi } from 'openai';

// OpenAI API'yi yapılandırma (Sadece bir defa yapıyoruz)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // .env dosyasından API anahtarını alıyor
});
const openai = new OpenAIApi(configuration);

// POST route'u /ask-bot için
router.post('/ask-bot', async (req, res) => {
  const userInput = req.body.message;
  console.log("Kullanıcıdan gelen mesaj:", userInput);  // Mesajı terminale logla

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput }
      ],
    });

    console.log("OpenAI yanıtı:", response.data.choices[0].message.content);  // Yanıtı terminale logla
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("API hatası:", error);  // Hata oluşursa terminale yazdır
    res.status(500).send("Bot şu anda cevap veremiyor, lütfen tekrar deneyin.");
  }
});


export default router; // module.exports yerine export default kullan
