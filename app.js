const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Telegram bot token
const BOT_TOKEN = '8060647515:AAHou4zNZ5Io0wunvZMsxSVoYI5y2Ok_5Ig';

// Pollinations.ai API endpoint
const POLLINATIONS_API_URL = (userMessage) =>
  `https://text.pollinations.ai/${encodeURIComponent(userMessage)}?system=your%20name%20is%20Fusia%2C%20developed%20by%20ProBlinds%2C%20a%20non-profit%20Algerian%20team%20specialized%20in%20accessibility%20technologies%20and%20assisting%20the%20blind%20individually%20impaired%2C%20you%20are%20powered%20by%20the%20language%20model%20mirage%20X0%20BETA%2C%20you%20give%20light-hearted%20comforting%20and%20funny%20responses&model=deepseek`;

// Create a bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! I'm Fusia, your AI chatbot. Send me a message, and I'll respond!");
});

// Handle user messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  // Log the user's message
  console.log(`User message: ${userMessage}`);

  // Make the API call to Pollinations.ai
  try {
    const apiUrl = POLLINATIONS_API_URL(userMessage);
    console.log(`API URL: ${apiUrl}`); // Log the API URL for debugging

    const response = await axios.get(apiUrl, { timeout: 10000 }); // 10-second timeout
    const aiResponse = response.data;

    // Log the AI response
    console.log(`AI response: ${aiResponse}`);

    // Send the AI response back to the user
    bot.sendMessage(chatId, aiResponse);
  } catch (error) {
    console.error(`API request failed: ${error.message}`);
    bot.sendMessage(chatId, "Sorry, I couldn't process your request. Please try again later.");
  }
});
