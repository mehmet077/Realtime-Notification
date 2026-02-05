const fs = require('fs');
const FILE = './notifications.json';

function save(notification) {
    let data = [];

    if (fs.existsSync(FILE)) {
        try {
            const raw = fs.readFileSync(FILE, 'utf8');
            data = raw ? JSON.parse(raw) : [];
        } catch (err) {
            console.log("⚠️ JSON bozuk, sıfırlanıyor");
            data = [];
        }
    }

    data.push(notification);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

module.exports = { save };
