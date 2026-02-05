// WebSocket kütüphanesini içeri aktarır
const WebSocket = require('ws');

// Bağlı kullanıcıları yöneten clients modülü
const clients = require('./clients');

// Bildirim gönderme ve broadcast işlemlerini yapan modül
const notification = require('./notification');

// 8080 portunda WebSocket server oluşturulur
const wss = new WebSocket.Server({ port: 8080 });

// Sunucu ayağa kalktığında konsola bilgi basılır
console.log("🚀 WebSocket server running on ws://localhost:8080");

// Yeni bir client bağlandığında tetiklenir
wss.on('connection', (ws) => {

    // Client’tan mesaj geldiğinde çalışır
    ws.on('message', (msg) => {
        // Ham (raw) mesajı string olarak loglar
        console.log("📩 RAW:", msg.toString());

        // Gelen mesaj JSON formatına çevrilir
        const data = JSON.parse(msg);

        // Client kendini sisteme tanıtıyorsa (register)
        if (data.type === "register") {
            // Kullanıcı ID + socket eşleştirilir
            clients.addClient(data.userId, ws);

            // console’a kayıt bilgisi yazılır
            console.log("✅ Registered:", data.userId);
        }

        // Test mesajı geldiyse
        if (data.type === "test") {
            console.log("🔥 TEST MESSAGE RECEIVED");

            // Sadece ilgili kullanıcıya bildirim gönderilir
            notification.direct(data.userId, {
                type: "info",
                message: "Test bildirimi 🎯"
            });
        }

        // Broadcast mesajı geldiyse
        if (data.type === "broadcast") {
            console.log("📢 BROADCAST GÖNDERİLDİ");

            // Sistemdeki tüm kullanıcılara bildirim gönderilir
            notification.broadcast(
                "📢 Sistem bakımı 10 dakika sonra başlayacaktır."
            );
        }
        if (data.type === "admin-send") {
            console.log("🧑‍💻 ADMIN SEND:", data.userId);

            notification.direct(data.userId, {
                type: "admin",
                message: data.message
            });
        }

    });

    // Client bağlantıyı kapattığında çalışır
    ws.on('close', () => {
        // Socket listeden temizlenir
        clients.removeClient(ws);

        // Konsola bağlantı kopma bilgisi yazılır
        console.log("❌ Client disconnected");
    });
});
