require('../config');

module.exports = async (sock, m) => {
    try {
        const type = Object.keys(m.message)[0];
        const body = (type === 'conversation') ? m.message.conversation :
            (type === 'imageMessage') ? m.message.imageMessage.caption :
            (type === 'videoMessage') ? m.message.videoMessage.caption :
            (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text :
            (type === 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
            (type === 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : 
            (type === 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : '';

        const budy = (typeof m.text == 'string' ? m.text : '');
        const prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : '.';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);
        const text = args.join(" ");
        const from = m.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        
        // Peserta & Owner Check
        const sender = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid;
        const isOwner = sender === global.ownerNumber;

        // Logging
        if (isCmd) console.log(`[CMD] ${command} | From: ${sender}`);

        // Helper Reply
        const reply = (teks) => {
            sock.sendMessage(from, { text: teks }, { quoted: m });
        };

        // --- ROUTER COMMAND ---
        if (!isCmd) return;

        switch (command) {
            // MENU UTAMA
            case 'menu':
            case 'help':
                require('../command/menu')(sock, m, from, reply, m.pushName);
                break;

            // KELOMPOK OWNER
            case 'ownermenu':
            case 'restart':
            case 'addprem':
                require('../command/owner')(sock, m, command, reply, isOwner);
                break;

            // KELOMPOK DOWNLOAD
            case 'downloadmenu':
            case 'tiktok':
            case 'ig':
                require('../command/download')(sock, m, command, text, reply);
                break;

            // KELOMPOK GRUP
            case 'groupmenu':
            case 'hidetag':
            case 'kick':
            case 'group':
                require('../command/group')(sock, m, command, text, reply, isGroup, sender);
                break;

            // KELOMPOK USER & DONASI & SCRIPT
            case 'usermenu':
            case 'donasi':
            case 'script':
            case 'me':
                require('../command/user')(sock, m, command, reply, sender, m.pushName);
                break;

            // KELOMPOK FUN & TOOLS
            case 'funmenu':
            case 'toolsmenu':
            case 'kapankah':
            case 'say':
                require('../command/fun')(sock, m, command, text, reply);
                break;

            default:
                // reply("Maaf Kak, command tidak ditemukan ☹️");
                break;
        }

    } catch (e) {
        console.error("Error Handler:", e);
    }
};
