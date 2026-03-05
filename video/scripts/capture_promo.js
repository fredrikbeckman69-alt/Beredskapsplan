const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'remotion', 'public', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureScreenshots() {
    console.log('Starting browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();

    // 0. Login first
    console.log('Navigating to login page...');
    await page.goto('http://localhost:3000/Beredskapsplan/login', { waitUntil: 'networkidle2' });

    console.log('Logging in with access code...');
    await page.type('input[type="password"]', '68092659');
    await page.click('button[type="submit"]');

    console.log('Waiting for login to complete and redirect...');
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => console.log('Wait for navigation after login timed out.'));

    // Give it an extra moment to settle
    await new Promise(r => setTimeout(r, 2000));

    // 1. Dashboard screenshot
    console.log('Navigating to Dashboard (Home)...');
    await page.goto('http://localhost:3000/Beredskapsplan', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 4000)); // allow animations and map to load
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'dashboard.png') });

    // 2. Action Cards screenshot
    console.log('Navigating to Action Cards...');
    await page.goto('http://localhost:3000/Beredskapsplan/action-cards', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'action_cards.png') });

    // 3. Communication screenshot
    console.log('Navigating to Communication...');
    await page.goto('http://localhost:3000/Beredskapsplan/communication', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'communication.png') });

    // 4. BIA screenshot
    console.log('Navigating to BIA...');
    await page.goto('http://localhost:3000/Beredskapsplan/bia', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'bia.png') });

    // 5. SMS Kris screenshot
    console.log('Navigating to SMS Kris...');
    await page.goto('http://localhost:3000/Beredskapsplan/sms-kris', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'sms_kris.png') });

    console.log('Screenshots captured successfully within Remotion public folder!');
    await browser.close();
}

captureScreenshots().catch(err => {
    console.error('Error capturing screenshots:', err);
    process.exit(1);
});
