const clients = require('./clients');
const storage = require('./storage'); // 👈 BU EKSİKTİ

// 🎯 TEK KULLANICIYA BİLDİRİM
function direct(userId, data) {

    const payload = {
        id: Date.now(),
        userId,
        type: data.type,
        message: data.message,
        date: new Date()
    };

    if (clients.isOnline(userId)) {
        clients.sendToUser(userId, payload);
    } else {
        // Offline ise kaydet
        storage.save(payload);
    }
}

// 📢 HERKESE BİLDİRİM
function broadcast(message) {

    const payload = {
        id: Date.now(),
        type: "info",
        message,
        date: new Date()
    };

    clients.sendToAll(payload);

    // Broadcast her zaman kaydedilir
    storage.save(payload);
}

module.exports = {
    direct,
    broadcast
};
