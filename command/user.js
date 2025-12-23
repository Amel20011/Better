module.exports = async (sock, m, command, reply, sender, pushName) => {
    if (command === 'usermenu') {
        const text = `
👤 *USER COMMANDS* 👤

🌷 *.me* (Cek profil kamu)
🌷 *.donasi* (Donasi bot)
🌷 *.script* (Source code)

_Menu simpel untuk kamu!_ 💗
`;
        reply(text);
    }

    else if (command === 'me') {
        reply(`👤 *Profil Kamu* 👤\n\nNama: ${pushName}\nNomor: ${sender.split('@')[0]}\nStatus: Member Setia 💗`);
    }

    else if (command === 'donasi') {
        reply(`🎁 *DONASI* 🎁\n\nDukung aku via:\n💸 DANA: 0812xxxx\n💸 OVO: 0812xxxx\n\nMakasih orang baik! 🫶🏻`);
    }

    else if (command === 'script') {
        reply(`📝 *SCRIPT BOT* 📝\n\nBot ini dibuat menggunakan library @fahriofficial/baileys-pro.\nBot ini Private, tapi kamu bisa minta ke owner ya! ✨`);
    }
};
