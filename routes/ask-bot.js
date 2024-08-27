const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//emre
router.post('/ask-bot', async (req, res) => {
  const userInput = req.body.message;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput }
      ],
    });

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API request error:", error);
    res.status(500).send("Bot şu anda cevap veremiyor, lütfen tekrar deneyin.");
  }
});

module.exports = router;
