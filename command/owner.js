module.exports = async (sock, m, command, reply, isOwner) => {
    if (!isOwner) return reply(global.mess.owner);

    if (command === 'ownermenu') {
        const text = `
👑 *OWNER COMMANDS* 👑

✨ *.restart* (Restart Bot)
✨ *.addprem* (Tambah User Premium)
✨ *.broadcast* (Kirim pesan ke semua)

_Khusus Boss ${global.ownerName} ya!_ 🫡
`;
        reply(text);
    } 
    
    else if (command === 'restart') {
        await reply("Merestart sistem... Tunggu sebentar ya Kak 🔄💗");
        process.exit();
    }
    
    else if (command === 'addprem') {
        reply("Fitur tambah premium belum disetting database-nya Kak 🌷");
    }
};
