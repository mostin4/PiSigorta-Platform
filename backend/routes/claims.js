const express = require('express');
const router = express.Router();
const { uploadToIPFS } = require('../ipfs/ipfsUpload');

router.post('/', async (req, res) => {
  try {
    const claim = req.body;

    // İstek gövdesinin boş olup olmadığını kontrol et
    if (!claim || Object.keys(claim).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Geçersiz istek: Gövde (body) boş olamaz."
      });
    }

    // IPFS'e yükleme yap
    const ipfsResult = await uploadToIPFS(claim);

    // ipfsUpload modülünden gelen başarı durumunu kontrol et
    if (!ipfsResult.success) {
      return res.status(502).json({
        success: false,
        error: `IPFS yükleme başarısız: ${ipfsResult.error}`
      });
    }

    return res.status(201).json({
      success: true,
      message: "Sigorta talebi başarıyla IPFS'e kaydedildi.",
      cid: ipfsResult.cid
    });

  } catch (error) {
    console.error("Claim Rota Hatası:", error.message);
    return res.status(500).json({
      success: false,
      error: "Sunucu içi bir hata oluştu."
    });
  }
});

module.exports = router;
