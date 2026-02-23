const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'app', 'public', 'logos');

async function run() {
    const url = `https://polisen.se/siteassets/bilder/polisen_vapen_bla.png`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
    });
    if (res.ok) {
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(path.join(outputDir, `polisen.png`), Buffer.from(buffer));
        console.log(`Downloaded polisen.png`);
    } else {
        console.log(`Failed polisen with error: ${res.status}`);
    }
}

run();
