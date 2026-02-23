const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'app', 'public', 'logos');

async function run() {
    const url = `https://icons.duckduckgo.com/ip3/polisen.se.ico`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
    });
    if (res.ok) {
        const buffer = await res.arrayBuffer();
        // DuckDuckGo returns ICO, but we can save it as is.
        fs.writeFileSync(path.join(outputDir, `polisen.ico`), Buffer.from(buffer));
        console.log(`Downloaded polisen.ico`);
    } else {
        console.log(`Failed polisen with error: ${res.status}`);
    }
}

run();
