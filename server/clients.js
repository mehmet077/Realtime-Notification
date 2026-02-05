// Sisteme bağlı olan tüm WebSocket client'ları tutan Map yapısı
// key   -> userId
// value -> WebSocket bağlantısı
const clients = new Map();


// 🔌 YENİ KULLANICI BAĞLANDIĞINDA ÇAĞRILIR
function addClient(userId, socket) {

    // Kullanıcı ID'si ile WebSocket bağlantısını eşleştirir
    clients.set(userId, socket);
}


// ❌ BAĞLANTI KAPANDIĞINDA ÇAĞRILIR
function removeClient(socket) {

    // Map içindeki tüm kullanıcıları dolaşır
    for (let [key, value] of clients.entries()) {

        // Kapanan socket hangisiyse onu bulur
        if (value === socket) {

            // O kullanıcıyı sistemden çıkarır
            clients.delete(key);
            break;
        }
    }
}


// 👁 KULLANICI ŞU ANDA ONLINE MI?
function isOnline(userId) {

    // Map içerisinde kullanıcı varsa online demektir
    return clients.has(userId);
}


// 🔔 TEK KULLANICIYA BİLDİRİM GÖNDERME
function sendToUser(userId, payload) {

    // Kullanıcının WebSocket bağlantısını al
    const socket = clients.get(userId);

    // Eğer bağlantı varsa mesaj gönder
    if (socket) {
        socket.send(JSON.stringify({
            type: "notification", // Client tarafında ayırt etmek için
            data: payload         // Bildirimin kendisi
        }));
    }
}


// 📢 TÜM ONLINE KULLANICILARA BİLDİRİM GÖNDERME (BROADCAST)
function sendToAll(payload) {

    // Sistemdeki tüm WebSocket bağlantılarını dolaşır
    for (let socket of clients.values()) {

        // Her bir kullanıcıya aynı bildirimi gönderir
        socket.send(JSON.stringify({
            type: "notification", // Client tarafında ortak type
            data: payload
        }));
    }
}


// Bu dosyadaki fonksiyonları diğer dosyaların kullanabilmesi için dışa aktarır
module.exports = {

    // Kullanıcı bağlandığında çağrılır
    addClient,

    // Kullanıcı bağlantıyı kapattığında çağrılır
    removeClient,

    // Kullanıcının online olup olmadığını kontrol eder
    isOnline,

    // Belirli bir kullanıcıya bildirim gönderir
    sendToUser,

    // Tüm kullanıcılara bildirim gönderir (broadcast)
    sendToAll // 👈 kritik fonksiyon
};
