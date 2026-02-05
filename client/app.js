const ws = new WebSocket("ws://localhost:8080");

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
                 title: "Kullanıcı kayıt oldu.",
                 message: "Kullanıcı sisteme başarıyla kayıt oldu.",
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
            showNotification(res);
        } catch (err) {
            console.error("❌ JSON parse hatası:", err);
        }
    };

    function createMessage({ userId, type, priority = "low", title = "Bildirim", message }) {
        return {
            userId,
            type,
            priority,
            title,
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
                 priority: "medium",
                 title: "Test Bildirimi",
                 message: "Bu bir test bildirimidir mehmet! 🎯",
                date: new Date().toISOString() 
            })
        ));
    });




    function showNotification(data) {
    const container = document.getElementById("notification-container");

    const notif = document.createElement("div");
    notif.className = `notification ${data.priority}`;

    notif.innerHTML = `
        <div class="notification-header">
            <div class="notification-title">${data.title}</div>
            <div class="notification-date">${data.date}</div>
        </div>
        <div class="notification-message">
            ${data.message}
        </div>
    `;

    container.appendChild(notif);

    // ⏱️ 3 saniye sonra kapansın
    setTimeout(() => {
        notif.style.animation = "slideOut 0.4s ease forwards";
        setTimeout(() => notif.remove(), 400);
    }, 3000);
}