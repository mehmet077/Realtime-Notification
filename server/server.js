const WebSocket = require('ws');
const clients = require('./clients');
const notification = require('./notification');

const wss = new WebSocket.Server({ port: 8080 });

console.log("🚀 WebSocket server running on ws://localhost:8080");

wss.on('connection', (ws) => {

    ws.on('message', (msg) => {
        try {
            console.log("📩 RAW:", msg.toString());
            const data = JSON.parse(msg.toString());

            responseData.userId = data.userId || null;
            responseData.type = data.type || "";
            responseData.message = data.message || "";
            responseData.date = new Date().toLocaleString("tr-TR");
            responseData.title = data.title || "";
            responseData.priority = data.priority || "low";
            
            console.log("📩 type", data.type);
            debugger;
            if (data.type === "register") {
                clients.addClient(data.userId, ws);
                console.log("✅ Registered:", data.userId);
            }

            if (data.type === "system-send") {
                console.log("🔥 Sistem Mesajı:");
                console.log("🧑‍💻 Gönderiyor:", data.userId);
                console.log(responseData);
                notification.direct(data.userId, responseData);
            }

             if (data.type === "admin-send") {
                console.log("🧑‍💻 Admin Gönderiyor:", data.userId);

                notification.direct(data.userId, responseData);

            }

            if (data.type === "broadcast") {
                console.log("📢 BROADCAST(Tüm Kayıtlı kullanıcılara) GÖNDERİLDİ");

                notification.broadcast(responseData);
            }

           

        } catch (err) {
            console.error("❌ Message handling error:", err);
        }
    });

    ws.on('close', () => {
        clients.removeClient(ws);
        console.log("❌ Client disconnected");
    });
});

 const responseData = {
        id: Date.now(),
        userId: null,
        type: "",
        priority: "low",
        title:"",
        message: "",
        date: new Date()
    };