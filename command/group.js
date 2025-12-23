module.exports = async (sock, m, command, text, reply, isGroup, sender) => {
    if (command === 'groupmenu') {
        const text = `
👥 *GROUP COMMANDS* 👥

🌷 *.hidetag* <teks> (Tag semua member)
🌷 *.kick* @tag (Keluarkan member)
🌷 *.group* open/close (Buka/Tutup grup)

_Hanya berlaku di dalam grup!_ ✨
`;
        reply(text);
    }

    // Logic Hidetag
    else if (command === 'hidetag') {
        if (!isGroup) return reply(global.mess.group);
        // Cek admin logic bisa ditambahkan disini
        
        const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = groupMetadata.participants;
        const teks = text ? text : "Halo semuanya! 💗";
        
        sock.sendMessage(m.key.remoteJid, { 
            text: teks, 
            mentions: participants.map(a => a.id) 
        }, { quoted: m });
    }

    // Logic Kick
    else if (command === 'kick') {
        if (!isGroup) return reply(global.mess.group);
        const mention = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!mention) return reply("Tag orang yang mau dikick Kak 🥺");
        
        await sock.groupParticipantsUpdate(m.key.remoteJid, [mention], 'remove');
        reply("Berhasil mengeluarkan member 👋🏻");
    }

    // Logic Buka/Tutup Grup
    else if (command === 'group') {
        if (!isGroup) return reply(global.mess.group);
        if (text === 'open') {
            await sock.groupSettingUpdate(m.key.remoteJid, 'not_announcement');
            reply("Grup berhasil dibuka! Member bisa chat sekarang 🌷");
        } else if (text === 'close') {
            await sock.groupSettingUpdate(m.key.remoteJid, 'announcement');
            reply("Grup ditutup! Hanya admin yang bisa chat 🔒");
        } else {
            reply("Pilih 'open' atau 'close' ya Kak ✨");
        }
    }
};
