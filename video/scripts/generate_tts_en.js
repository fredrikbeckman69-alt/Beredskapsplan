const googleTTS = require('google-tts-api');
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '..', 'remotion', 'public', 'audio');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Calm, educational English script, no mention of the app name, true to the screenshots
const scenes = [
    {
        filename: 'en_dashboard.mp3',
        text: 'The main dashboard provides an instant overview of system status and critical alerts, keeping you informed in real-time.'
    },
    {
        filename: 'en_action_cards.mp3',
        text: 'Action cards offer clear, step-by-step instructions tailored for specific scenarios, ensuring the right procedures are followed during an incident.'
    },
    {
        filename: 'en_communication.mp3',
        text: 'The communication module allows you to quickly organize and reach out to key personnel and external partners when needed.'
    },
    {
        filename: 'en_bia.mp3',
        text: 'The Business Impact Analysis section helps evaluate and manage potential risks to your operational continuity.'
    },
    {
        filename: 'en_sms.mp3',
        text: 'Finally, the emergency S M S feature enables instant broadcasting of vital information to your entire organization.'
    }
];

const downloadFile = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve());
            } else {
                res.resume();
                reject(new Error(`Request Failed: ${res.statusCode}`));
            }
        });
    });
};

async function generateAudio() {
    for (const scene of scenes) {
        try {
            console.log(`Generating audio for: ${scene.filename}...`);

            const url = googleTTS.getAudioUrl(scene.text, {
                lang: 'en-US',
                slow: false,
                host: 'https://translate.google.com',
            });

            await downloadFile(url, path.join(OUTPUT_DIR, scene.filename));
            console.log(`Saved ${scene.filename}`);
            await new Promise(r => setTimeout(r, 1500));
        } catch (err) {
            console.error(`Error generating ${scene.filename}:`, err);
        }
    }
    console.log('All English audio files generated.');
}

generateAudio();
