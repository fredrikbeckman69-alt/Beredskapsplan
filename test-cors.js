const https = require('https');
const http = require('http');
const { URL } = require('url');

const urls = [
    'https://api.krisinformation.se/v3/news?format=json',
    'https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json',
    'https://polisen.se/api/events',
    'https://news.google.com/rss/search?q=L%C3%A4nsstyrelsen+when:7d&hl=sv&gl=SE&ceid=SE:sv',
    'https://www.cert.se/feed.rss',
    'https://status.bankid.com/api/v2/summary.json',
    'http://api.sr.se/api/v2/traffic/messages?format=json'
];

async function checkCORS(urlStr) {
    return new Promise((resolve) => {
        const parsedUrl = new URL(urlStr);
        const requestFn = parsedUrl.protocol === 'https:' ? https.request : http.request;
        const req = requestFn(urlStr, {
            method: 'OPTIONS', // Try OPTIONS first
            headers: {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'GET',
            }
        }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400 && res.headers['access-control-allow-origin']) {
                resolve({ url: urlStr, cors: true, header: res.headers['access-control-allow-origin'] });
            } else {
                // Try a simple GET
                const getReq = requestFn(urlStr, {
                    method: 'GET',
                    headers: { 'Origin': 'http://localhost:3000' }
                }, (getRes) => {
                    resolve({ url: urlStr, cors: !!getRes.headers['access-control-allow-origin'], header: getRes.headers['access-control-allow-origin'] });
                });
                getReq.on('error', () => resolve({ url: urlStr, cors: false }));
                getReq.end();
            }
        });
        req.on('error', () => resolve({ url: urlStr, cors: false }));
        req.end();
    });
}

(async () => {
    for (const url of urls) {
        const result = await checkCORS(url);
        console.log(`${result.url}: CORS Allowed? ${result.cors} (${result.header || 'None'})`);
    }
})();
