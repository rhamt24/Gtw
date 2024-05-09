const getGreeting = (telegramBot, commands) => {
    telegramBot.onText(commands.greeting, (data) => {
        console.log("getGreeting Executed By " + data.from.username)
        telegramBot.sendMessage(data.from.id, "Halo juga sayang! 💕")
    })
}

module.exports = getGreeting;
