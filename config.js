const fs = require('fs');

// GLOBAL CONFIG
global.ownerNumber = "6281234567890@s.whatsapp.net"; // GANTI NOMOR KAMU (pakai @s.whatsapp.net)
global.botName = "AuraBot 💗";
global.ownerName = "Owner Cantik ✨";
global.sessionName = "session";

// WATERMARK
global.packname = "Sticker by";
global.author = "AuraBot 💗";

// MESSAGES
global.mess = {
    wait: "Sebentar ya Kak, lagi diproses... ⏳💗",
    success: "Selesai Kak! ✨🫶🏻",
    error: "Aduh, ada error sistem nih Kak ☹️",
    owner: "Maaf, fitur ini khusus Owner aku ya! 👑",
    group: "Fitur ini cuma bisa dipakai di Grup 🌷",
    admin: "Kamu harus jadi Admin grup dulu ya Kak! 👮‍♀️",
    botAdmin: "Bot harus jadi Admin dulu biar bisa kerja! 🤖",
    private: "Chat aku di Private Message ya Kak! 💌"
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update '${__filename}'`);
    delete require.cache[file];
    require(file);
});
