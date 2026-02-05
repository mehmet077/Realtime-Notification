# WebSocket Bildirim Sistemi

Bu proje, admin panelinden belirli kullanıcılara **gerçek zamanlı bildirim** göndermek için hazırlanmıştır.  
İletişim **WebSocket** üzerinden yapılır.

Admin; kullanıcı ID, başlık, mesaj ve öncelik seçerek bildirim gönderir.  
Kullanıcı tarafında bildirimler ekranda toast olarak gösterilir.

---

## Ne İşe Yarar?

- Admin → kullanıcı arası anlık bildirim gönderme
- Priority (high / medium / low) desteği
- Başlık + mesaj içeren bildirimler
- Otomatik kapanan bildirimler
- Önceliğe göre renkli progress bar
- Canlı WebSocket bağlantısı

---

## Kullanılan Teknolojiler

- HTML
- CSS
- JavaScript
- Node.js
- WebSocket (`ws`)

---

## Sistem Nasıl Çalışır?

1. WebSocket server çalışır
2. Kullanıcı sisteme bağlanır ve kendi `userId` bilgisini gönderir
3. Admin paneli üzerinden bildirim gönderilir
4. Server bildirimi ilgili kullanıcıya iletir
5. Kullanıcının ekranında bildirim gösterilir

---

## Kullanılan Teknolojiler

- proje içerisinde Terminali aç vsCode Kısayol(ctrl + shift + ")
- cd server
- npm init -y
- npm install ws
- node server.js
- client dosyasını aç
- index.html çalıştır
---

## Bildirim Veri Yapısı

```json
{
  "id": 1,
  "type": "system-send",
  "userId": "acfdbc30-5339-49fc-9352-fb02f2fc522b",
  "title": "Test Bildirimi",
  "message": "Bu bir test bildirimidir",
  "priority": "high",
  "date": "05.02.2026 16:25:08"
}

