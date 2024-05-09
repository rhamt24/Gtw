const axios = require('axios');

const getTourl = (telegramBot, commands, botToken) => {
    telegramBot.onText(commands.tourl, async (msg) => {
        try {
            const chatId = msg.chat.id;
            await telegramBot.sendMessage(chatId, 'Silakan kirim gambar atau video untuk mendapatkan URL file.');
        } catch (error) {
            console.error("Error in getTourl:", error.message);
            telegramBot.sendMessage(msg.chat.id, 'Maaf, terjadi kesalahan.');
        }
    });

    telegramBot.on('photo', async (message) => {
        try {
            const chatId = message.chat.id;
            const photo = message.photo[message.photo.length - 1]; // Ambil gambar terbesar
            const fileId = photo.file_id;
            const caption = message.caption || '';

            // Ambil info file gambar dari Telegram
            const file = await telegramBot.getFile(fileId);
            const fileUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;

            // Unggah gambar ke telegra.ph
            const response = await axios.post('https://telegra.ph/upload', {
                image: axios.get(fileUrl, { responseType: 'arraybuffer' }), // Menggunakan axios untuk mendapatkan file gambar dalam bentuk array buffer
                fileType: 'image',
                mimeType: 'image/jpeg',
            });

            // Dapatkan URL gambar dari respons
            const imageUrl = response.data[0]?.src;

            // Kirim URL gambar ke pengguna dengan caption "tourl" atau reply
            await telegramBot.sendPhoto(chatId, imageUrl, { caption: caption.includes('tourl') ? 'URL gambar: ' + imageUrl : '', reply_to_message_id: message.message_id });
        } catch (error) {
            console.error("Error in getTourl:", error.message);
            telegramBot.sendMessage(message.chat.id, 'Maaf, terjadi kesalahan saat mengunggah gambar.');
        }
    });

    telegramBot.on('video', async (message) => {
        try {
            const chatId = message.chat.id;
            const fileId = message.video.file_id;

            // Ambil info file video dari Telegram
            const file = await telegramBot.getFile(fileId);
            const fileUrl = `https://api.telegram.org/file/bot${botToken}/${file.file_path}`;

            // Unggah video ke telegra.ph
            const response = await axios.post('https://telegra.ph/upload', {
                video: fileUrl, // Mengunggah video langsung dengan URL file
                fileType: 'video',
                mimeType: 'video/mp4',
            });

            // Dapatkan URL video dari respons
            const videoUrl = response.data[0]?.src;

            // Kirim URL video ke pengguna
            await telegramBot.sendMessage(chatId, `URL video: ${videoUrl}`);
        } catch (error) {
            console.error("Error in getTourl:", error.message);
            telegramBot.sendMessage(message.chat.id, 'Maaf, terjadi kesalahan saat mengunggah video.');
        }
    });
}

module.exports = getTourl
