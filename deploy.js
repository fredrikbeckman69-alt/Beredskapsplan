const { Client } = require('ssh2');
const conn = new Client();
conn.on('ready', () => {
  const script = `
    rm -rf /tmp/b-dir && mkdir /tmp/b-dir && cd /tmp/b-dir && \
    git init && git remote add origin https://github.com/fredrikbeckman69-alt/Beredskapsplan.git && git pull origin main && \
    echo "JBCUanT2s2h7!" | sudo -S cp -ru * /opt/antigravity/Beredskapsplan/ && \
    echo "JBCUanT2s2h7!" | sudo -S chmod +x /opt/antigravity/Beredskapsplan/scripts/healthcheck.sh && \
    bash /opt/antigravity/Beredskapsplan/scripts/healthcheck.sh || true
  `;
  conn.exec(script, (err, stream) => {
    stream.on('close', (code) => { console.log('Exit: ' + code); conn.end(); })
          .on('data', d => console.log('OUT: ' + d))
          .stderr.on('data', d => console.error('ERR: ' + d));
  });
}).connect({ host: '192.168.19.13', port: 22, username: 'fredrikadmin', password: 'JBCUanT2s2h7!' });
