const TelegramBot = require("node-telegram-bot-api");

// сюда вставь токен, который тебе дал BotFather
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

// команда /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет! Я бот для записи 😊");
});

// обработка кнопки "записаться"
bot.on("message", (msg) => {
  const text = msg.text?.toLowerCase(); // проверка без регистра
  if (text && text.includes("записаться")) {
    bot.sendMessage(msg.chat.id, "Выберите время:", {
      reply_markup: {
        keyboard: [["10:00", "12:00"], ["14:00", "16:00"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }
});
