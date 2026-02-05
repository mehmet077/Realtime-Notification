const ws = new WebSocket("ws://localhost:8080");

const responseData = {
        id: Date.now(),
        userId: null,
        type: "",
        message: "",
        date: new Date()
    };

    // 🔐 LocalStorage'dan kalıcı userId al
    let userId = localStorage.getItem("notification_user_id");

    ws.onopen = () => {

        // ❗ Yoksa sadece BİR KEZ oluştur
        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem("notification_user_id", userId);
        }

        // 📡 Sisteme register ol
        ws.send(JSON.stringify(
            createMessage({
                 userId,
                 type: "register",
                 message: "Kullanıcı kayıt oldu.",
                date: new Date().toISOString() 
            })
        ));


        console.log("✅ Sisteme bağlanan userId:", userId);
    };

    // 🔔 Bildirimleri dinle
    ws.onmessage = (e) => {
        try {
            const res = JSON.parse(e.data);

        console.log("📩 Bildirim alındı:", res);
            showNotification(res.data.message);
        } catch (err) {
            console.error("❌ JSON parse hatası:", err);
        }
    };

    function createMessage({ userId, type, message }) {
        return {
            id: Date.now(),
            userId,
            type,
            message,
            date: new Date().toISOString()
        };
    }

    // 🧪 Test bildirimi
    document.getElementById("testBtn").addEventListener("click", () => {
         ws.send(JSON.stringify(
            createMessage({
                 userId,
                 type: "system-send",
                 message: "Bu bir test bildirimidir mehmet! 🎯",
                date: new Date().toISOString() 
            })
        ));
    });




    function showNotification(message) {
    const container = document.getElementById("notification-container");

    const notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = message.message;

    container.appendChild(notif);

    // ⏱️ 3 saniye sonra kayarak kapansın
    setTimeout(() => {
        notif.style.animation = "slideOut 0.4s ease forwards";
        setTimeout(() => notif.remove(), 400);
    }, 3000);
}
