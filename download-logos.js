const fs = require('fs');
const https = require('https');
const path = require('path');

const domains = {
    smhi: 'smhi.se',
    polisen: 'polisen.se',
    lansstyrelsen: 'lansstyrelsen.se',
    mcf: 'msb.se' // Krisinformation/MSB
};

const outputDir = path.join(__dirname, 'app', 'public', 'logos');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(domains).forEach(([name, domain]) => {
    const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
    const dest = path.join(outputDir, `${name}.png`);

    https.get(url, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Failed to download ${name} (${res.statusCode})`);
            return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${name}.png`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${name}:`, err.message);
    });
});
