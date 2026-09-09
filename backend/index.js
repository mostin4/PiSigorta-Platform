const express = require('express');
const { ethers } = require('ethers');
const { create } = require('ipfs-http-client');
const ai = require('./ai/riskScorer');

const app = express();
app.use(express.json());

// Infura IPFS kapandığı için güncel bir IPFS gateway veya alternatif (Pinata / Local Daemon) kullanılmalıdır.
const ipfsClient = create({ url: process.env.IPFS_URL || 'https://ipfs.infura.io:5001' });

// Ethers.js sağlayıcı ve cüzdan yapılandırması (Canlı ortam için env değişkenleri zorunludur)
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "https://api.testnet.minepi.com");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "0x...", provider);
const CONTRACT_ADDRESS = process.env.PI_POLICY_CONTRACT_ADDRESS || "0xKontratAdresi";
const CONTRACT_ABI = ["function registerPolicy(string memory cid, uint256 riskScore) public returns (bool)"];

app.post('/submitPolicy', async (req, res) => {
  try {
    const policy = req.body;

    if (!policy || Object.keys(policy).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz istek: Poliçe verisi boş olamaz."
      });
    }

    // 1. AI Modülü ile Risk Skoru Hesaplama
    let riskScore;
    try {
      riskScore = await ai.calculateRiskScore(policy);
    } catch (aiError) {
      console.error("AI Risk Hesaplama Hatası:", aiError.message);
      return res.status(502).json({ success: false, error: "Yapay zeka analizi başarısız oldu." });
    }

    // 2. IPFS'e Veri Yükleme
    let ipfsResult;
    try {
      const payload = JSON.stringify({ ...policy, riskScore, timestamp: Date.now() });
      ipfsResult = await ipfsClient.add(payload);
    } catch (ipfsError) {
      console.error("IPFS Yükleme Hatası:", ipfsError.message);
      return res.status(502).json({ success: false, error: "IPFS veri yüklemesi başarısız oldu." });
    }
    const cid = ipfsResult.path;

    // 3. Blokzincir (Pi Smart Contract) Entegrasyonu
    let txHash = null;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
      // Risk skorunu akıllı kontratın kabul edeceği formata (örn: integer) dönüştür
      const formattedRiskScore = Math.floor(Number(riskScore) * 100); 

      const tx = await contract.registerPolicy(cid, formattedRiskScore);
      const receipt = await tx.wait();
      txHash = receipt.hash;
    } catch (bcError) {
      console.error("Blokzincir İşlem Hatası:", bcError.message);
      return res.status(500).json({ 
        success: false, 
        error: "IPFS'e kaydedildi ancak blokzincir işlemi başarısız oldu.",
        cid: cid
      });
    }

    return res.status(201).json({
      success: true,
      message: "Poliçe başarıyla analiz edildi, IPFS'e yüklendi ve zincire kaydedildi.",
      cid,
      riskScore,
      txHash
    });

  } catch (error) {
    console.error("Genel Sunucu Hatası:", error.message);
    return res.status(500).json({
      success: false,
      error: "Sunucu içi kritik bir hata oluştu."
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend API running on port ${PORT}`));
