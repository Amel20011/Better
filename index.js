const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion 
} = require('@fahriofficial/baileys-pro');

const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
require('./config');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(`./${global.sessionName}`);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ["AuraBot 💗", "Chrome", "1.0.0"],
        defaultQueryTimeoutMs: undefined,
        keepAliveIntervalMs: 30000
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) {
                console.log("❌ File Sesi Rusak, Hapus Folder Session & Scan Ulang");
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("🔄 Koneksi Terputus, Reconnecting...");
                startBot();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("📡 Koneksi Hilang, Reconnecting...");
                startBot();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log("📵 Device Keluar, Scan Ulang QR!");
                process.exit();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("🔄 Restart Required...");
                startBot();
            } else {
                console.log(`⚠️ Disconnect Reason: ${reason}`);
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ Bot Connected! Siap Melayani 💗');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
            
            require('./handler/message')(sock, mek);
        } catch (err) {
            console.log(err);
        }
    });
}

startBot();
