require("dotenv").config();
const Zhubot = require("./Zhubot");

const token = "7013609557:AAGx7I763NVychZq3Tl_aNfhRJx0ETyKrMw";
const options = {
    polling: true
};

console.log("Starting Zhubot...");

const myZhubot = new Zhubot(token, options);

console.log("Bot is ready now!");
