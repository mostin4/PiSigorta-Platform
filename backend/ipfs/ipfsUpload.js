const { create } = require('ipfs-http-client');
const client = create({ url: 'https://ipfs.infura.io:5001' });

async function uploadToIPFS(data) {
  const result = await client.add(JSON.stringify(data));
  return result.path;
}

module.exports = { uploadToIPFS };
