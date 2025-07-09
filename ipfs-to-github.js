const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');

const cid = 'QmXYZ1234567890'; // Buraya kendi CID’ini yaz
const filename = 'policy-from-ipfs.json';

https.get(`https://ipfs.io/ipfs/${cid}`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync(`./data/${filename}`, data);
    console.log(`✅ Dosya indirildi: ${filename}`);

    // Git işlemleri
    execSync('git config --global user.name "PiSigorta-Bot"');
    execSync('git config --global user.email "pisigorta@bot.com"');
    execSync(`git add ./data/${filename}`);
    execSync(`git commit -m "Add IPFS file ${filename}"`);
    execSync('git push');
    console.log('📤 Dosya GitHub repo’ya gönderildi.');
  });
});
