module.exports = async (sock, m, command, text, reply) => {
    if (command === 'funmenu' || command === 'toolsmenu') {
        const text = `
🎡 *FUN & TOOLS* 🎡

🌷 *.kapankah* <pertanyaan>
🌷 *.say* <teks>

_Just for fun ya Kak!_ ✨
`;
        reply(text);
    }

    else if (command === 'kapankah') {
        if (!text) return reply("Tanya apa Kak? Contoh: .kapankah aku kaya");
        const jawaban = ["Besok", "Lusa", "Masih lama ☹️", "Sebentar lagi! ✨", "Mungkin tahun depan"];
        const random = jawaban[Math.floor(Math.random() * jawaban.length)];
        reply(`🔮 Pertanyaan: ${text}\n💬 Jawaban: *${random}*`);
    }

    else if (command === 'say') {
        if (!text) return reply("Mau bilang apa?");
        reply(text);
    }
};
