const { create } = require('ipfs-http-client');

// Not: Infura IPFS kapandığı için alternatif bir IPFS gateway (Örn: Pinata veya Local Node) 
// ve kimlik doğrulama bilgileri (Project ID / Secret) gereklidir.
const client = create({
  host: 'ipfs.infura.io', // veya başka bir sağlayıcı host adresi
  port: 5001,
  protocol: 'https',
  // headers: {
  //   authorization: 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  // }
});

async function uploadToIPFS(data) {
  try {
    if (!data) {
      throw new Error("Yüklenecek veri boş olamaz.");
    }

    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    const result = await client.add(payload);
    
    return {
      success: true,
      path: result.path,
      cid: result.cid.toString()
    };
  } catch (error) {
    console.error("IPFS Veri Yükleme Hatası:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = { uploadToIPFS };
