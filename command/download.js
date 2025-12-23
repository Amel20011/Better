module.exports = async (sock, m, command, text, reply) => {
    if (command === 'downloadmenu') {
        const text = `
📥 *DOWNLOAD CENTER* 📥

🌷 *.tiktok* <link>
🌷 *.ig* <link>

_Pastikan link-nya valid ya Kak!_ ✨
`;
        reply(text);
    } 
    
    else if (command === 'tiktok' || command === 'ig') {
        if (!text) return reply(`Mana link-nya Kak? 🥺\nContoh: .${command} https://url.com/xxx`);
        
        reply(global.mess.wait);
        
        // Simulasi Download (Karena kita tidak pakai API key asli disini)
        setTimeout(() => {
            reply(`✅ *Sukses Kak!* ✨\n\nIni simulasi karena belum ada API key, tapi kodenya sudah jalan! 💗\nLink kamu: ${text}`);
        }, 2000);
    }
};
