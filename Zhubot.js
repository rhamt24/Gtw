const TelegramBot = require("node-telegram-bot-api");
const commands = require("./libs/commands");
const { helpTextMessage, invalidCommandMessage } = require("./libs/constant");
const getGreeting = require("./app/getGreeting");
const getQuake = require("./app/getQuake");

class Zhubot extends TelegramBot {
    constructor(token, options) {
        super(token, options);
        this.initializeBot();
    }

    initializeBot() {
        this.on("message", (message) => {
            const text = message.text ? message.text.trim() : '';

            if (!text) return; // Memastikan pesan tidak kosong atau null

            // Periksa apakah pesan dimulai dengan salah satu prefix yang valid
            const isValidPrefix = Object.keys(commands).some(prefix => text.startsWith(prefix));

            // Jika pesan dimulai dengan prefix yang valid, lanjutkan untuk memeriksa apakah itu adalah perintah yang valid
            if (isValidPrefix) {
                console.log(`Command Executed By ${message.from.username || message.from.first_name} => ${text}`);
                
                const isInCommand = Object.values(commands).some(keyword => keyword.test(text));

                if (!isInCommand) {
                    // Jika pesan dimulai dengan prefix yang valid tapi bukan perintah yang valid, kirim pesan bahwa perintah tidak valid
                    const replyTo = message.chat.type === "group" ? message.chat.id : message.from.id;
                    this.sendMessage(replyTo, invalidCommandMessage, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: "Panduan Pengguna",
                                        callback_data: "go_to_help"
                                    }
                                ]
                            ]
                        }
                    });
                }
            } else {
                // Jika pesan dimulai dengan karakter yang cocok dengan prefix tetapi tidak ada perintah, kirim pesan panduan pengguna
                if (message.chat.type === "group") {
                    this.sendMessage(message.chat.id, helpTextMessage);
                }
            }
        });

        this.on("callback_query", (callback) => {
            const callbackName = callback.data;
            if (callbackName === "go_to_help") {
                this.sendMessage(callback.from.id, helpTextMessage);
            }
        });

        // Panggil setiap fitur terpisah di sini
        getGreeting(this, commands);
        getQuake(this, commands);
        // Panggil fitur lainnya juga
    }
}

module.exports = Zhubot;
