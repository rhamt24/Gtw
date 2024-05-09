const fetch = require("node-fetch");

const getQuake = (telegramBot, commands) => {
    const quakeCommand = commands.quake;

    telegramBot.onText(quakeCommand, async (message) => {
        try {
            console.log(`getQuake Executed By ${message.from.username}`);

            // Mendapatkan data gempa dari endpoint
            const quakeEndpoint = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
            const response = await fetch(quakeEndpoint);

            if (!response.ok) {
                throw new Error("Failed to fetch earthquake data");
            }

            const quakeData = await response.json();
            const { gempa } = quakeData.Infogempa;
            const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman, Shakemap } = gempa;

            // Membuat URL gambar
            const imgSourceUrl = "https://data.bmkg.go.id/DataMKG/TEWS/" + Shakemap;

            // Mengirim gambar dan informasi gempa kepada pengguna
            await telegramBot.sendPhoto(message.chat.id, imgSourceUrl, {
                caption: `Info gempa terbaru ${Tanggal} / ${Jam}:\n\nWilayah: ${Wilayah}\nBesaran: ${Magnitude} SR\nKedalaman: ${Kedalaman}\n\n`
            });
        } catch (error) {
            console.error("Error in getQuake:", error.message);
            telegramBot.sendMessage(message.chat.id, "Maaf, terjadi kesalahan saat mengambil data gempa.");
        }
    });
}

module.exports = getQuake
