const clients = require('./clients');
const storage = require('./storage'); // 👈 BU EKSİKTİ

// 🎯 TEK KULLANICIYA BİLDİRİM
function direct(userId, data) {

    if (clients.isOnline(userId)) {
        clients.sendToUser(userId, data);
    } else {
        // Offline ise kaydet
        storage.save(data);
    }
}

// 📢 HERKESE BİLDİRİM
function broadcast(data) {
    clients.sendToAll(data);


    storage.save(data);
}

module.exports = {
    direct,
    broadcast
};
