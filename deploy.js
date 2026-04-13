const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  // We pull changes, copy them, make healthcheck executable, and register crontab.
  const script = `
    docker exec beredskapsplan-app node -e "fetch('http://localhost:3000/api/intelligence').then(r=>console.log(r.status))"
  `;
  
  conn.exec(script, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code);
      conn.end();
    }).on('data', (d) => console.log('OUT: ' + d)).stderr.on('data', (d) => console.error('ERR: ' + d));
  });
}).connect({ host: '192.168.19.13', port: 22, username: 'fredrikadmin', password: 'JBCUanT2s2h7!' });
