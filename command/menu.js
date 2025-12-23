module.exports = async (sock, m, from, reply, pushName) => {
    // Ucapan Waktu
    const hours = new Date().getHours();
    let greet = "Malam";
    if (hours >= 4 && hours < 11) greet = "Pagi";
    else if (hours >= 11 && hours < 15) greet = "Siang";
    else if (hours >= 15 && hours < 19) greet = "Sore";

    const sections = [
        {
            title: "💐 DASHBOARD UTAMA",
            rows: [
                { title: "👑 Owner Menu", rowId: ".ownermenu", description: "Panel khusus owner" },
                { title: "📥 Download Menu", rowId: ".downloadmenu", description: "TikTok, IG, YouTube" },
                { title: "👥 Group Menu", rowId: ".groupmenu", description: "Admin & Member tools" },
                { title: "👤 User Menu", rowId: ".usermenu", description: "Profil & Status" },
                { title: "🎡 Fun & Tools", rowId: ".funmenu", description: "Hiburan seru" }
            ]
        },
        {
            title: "✨ LAINNYA",
            rows: [
                { title: "🎁 Donasi", rowId: ".donasi", description: "Traktir owner kopi" },
                { title: "📝 Script Bot", rowId: ".script", description: "Source code" }
            ]
        }
    ];

    const listMessage = {
        text: `Haii Kak *${pushName || 'User'}*, Selamat ${greet}! 💗\n\nAku *${global.botName}* siap membantu kamu.\nSilahkan pilih menu yang tersedia di bawah ini ya 🌷✨`,
        footer: `Powered by ${global.ownerName} 🫶🏻`,
        title: "🌸 WHATSAPP BOT MENU 🌸",
        buttonText: "🎀 KLIK DISINI 🎀",
        sections
    };

    // Kirim List
    await sock.sendMessage(from, listMessage, { quoted: m });
};
