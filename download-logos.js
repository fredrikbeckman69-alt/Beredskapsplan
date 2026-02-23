const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'app', 'public', 'logos');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
    const url = `https://upload.wikimedia.org/wikipedia/commons/e/ea/Polisen_vapen.svg`;
    const res = await fetch(url);
    if (res.ok) {
        const text = await res.text();
        fs.writeFileSync(path.join(outputDir, `polisen.svg`), text);
        console.log(`Downloaded polisen.svg`);
    } else {
        console.log(`Failed polisen`);
    }
}

run();
