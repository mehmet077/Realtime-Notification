// const userId = crypto.randomUUID();
const userId = "LocalUser123"; // Sabit bir kullanıcı ID'si kullanıyoruz
const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
    ws.send(JSON.stringify({
        type: "register",
        userId
    }));
};

ws.onmessage = (e) => {
    const res = JSON.parse(e.data);

    if (res.type === "notification") {
        const li = document.createElement("li");
        li.textContent = res.data.message;
        document.getElementById("list").appendChild(li);
    }
};

document.getElementById("testBtn").addEventListener("click", () => {
    ws.send(JSON.stringify({
        type: "test",
        userId
    }));
});

document.getElementById("broadcastBtn").addEventListener("click", () => {
    ws.send(JSON.stringify({
        type: "broadcast"
    }));
});
