const TelegramBot = require("node-telegram-bot-api");

// токен из BotFather (он у тебя уже в Render в ENV)
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// команда /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет! Я бот для записи 😊\nНапиши 'записаться', чтобы выбрать время.");
});

// обработка сообщений
bot.on("message", (msg) => {
  const text = msg.text?.toLowerCase();

  // если человек написал "записаться"
  if (text && text.includes("записаться")) {
    bot.sendMessage(msg.chat.id, "Выберите время:", {
      reply_markup: {
        keyboard: [["10:00", "12:00"], ["14:00", "16:00"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  // обработка выбора времени
  if (["10:00", "12:00", "14:00", "16:00"].includes(text)) {
    bot.sendMessage(msg.chat.id, `Вы записаны на ${text} ✅`, {
      reply_markup: { remove_keyboard: true },
    });
  }
});
