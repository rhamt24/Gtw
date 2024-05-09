const TelegramBot = require("node-telegram-bot-api");
const commands = require("./libs/commands");
const { helpTextMessage, invalidCommandMessage } = require("./libs/constant");
const getGreeting = require("./app/getGreeting");

class Zhubot extends TelegramBot {
    constructor(token, options) {
        super(token, options);
        this.initializeBot();
    }

    initializeBot() {
        this.on("message", (data) => {
            console.log(`Invalid Command Executed By ${data.from.username} => ${data.text}`);
            const isInCommand = Object.values(commands).some(keyword => keyword.test(data.text));

            if (!isInCommand) {
                this.sendMessage(data.from.id, invalidCommandMessage, {
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
        });

        this.on("callback_query", (callback) => {
            const callbackName = callback.data;
            if (callbackName == "go_to_help") {
                this.sendMessage(callback.from.id, helpTextMessage);
            }
        });

        // Panggil setiap fitur terpisah di sini
        getGreeting(this, commands);
        // Panggil fitur lainnya juga
    }
}

module.exports = Zhubot;
