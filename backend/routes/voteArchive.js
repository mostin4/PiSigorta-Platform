const express = require('express');
const router = express.Router();
const { uploadToIPFS } = require('../ipfs/ipfsUpload');

router.post('/', async (req, res) => {
  try {
    const voteData = req.body; // { proposalId, votes }

    // İstek gövdesi ve zorunlu alan doğrulaması
    if (!voteData || Object.keys(voteData).length === 0 || !voteData.proposalId) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz istek: 'proposalId' alanı zorunludur ve veri boş olamaz."
      });
    }

    // IPFS'e yükleme yap
    const ipfsResult = await uploadToIPFS(voteData);

    // Servisten dönen başarı durumunu kontrol et
    if (!ipfsResult.success) {
      return res.status(502).json({
        success: false,
        error: `IPFS yükleme başarısız: ${ipfsResult.error}`
      });
    }

    return res.status(201).json({
      success: true,
      message: "Oylama verisi başarıyla IPFS'e kaydedildi.",
      cid: ipfsResult.cid
    });

  } catch (error) {
    console.error("Vote IPFS Rota Hatası:", error.message);
    return res.status(500).json({
      success: false,
      error: "Sunucu içi bir hata oluştu."
    });
  }
});

module.exports = router;
