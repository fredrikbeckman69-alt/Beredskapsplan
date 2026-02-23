const fs = require('fs');
const path = require('path');

const domains = {
    smhi: 'smhi.se',
    polisen: 'polisen.se',
    lansstyrelsen: 'lansstyrelsen.se',
    mcf: 'krisinformation.se'
};

const outputDir = path.join(__dirname, 'app', 'public', 'logos');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
    for (const [name, domain] of Object.entries(domains)) {
        const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
        const res = await fetch(url);
        if (res.ok) {
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(path.join(outputDir, `${name}.png`), Buffer.from(buffer));
            console.log(`Downloaded ${name}.png`);
        } else {
            console.log(`Failed ${name}`);
        }
    }
}

run();
