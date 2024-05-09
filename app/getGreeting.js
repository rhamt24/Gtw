const getGreeting = (telegramBot, commands) => {
    telegramBot.onText(commands.greeting, (message) => {
        try {
            console.log(`getGreeting Executed By ${message.from.username}`);
            const greetingMessage = `Halo juga, ${message.from.first_name || message.from.username}! Semoga harimu menyenangkan. 😊`;
            telegramBot.sendMessage(message.chat.id, greetingMessage);
        } catch (error) {
            console.error("Error in getGreeting:", error.message);
        }
    });
}

module.exports = getGreeting;
