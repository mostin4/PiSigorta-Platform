const express = require('express');
const router = express.Router();
const { ethers } = require('hardhat');

// Kontrat adresini ortam değişkeninden veya yapılandırmadan alın
const CONTRACT_ADDRESS = process.env.PI_POLICY_CONTRACT_ADDRESS || "0xKontratAdresiBurayaYazilmalidir";

router.post('/', async (req, res) => {
  try {
    const { proposalId, cid } = req.body;

    // İstek gövdesi doğrulaması
    if (proposalId === undefined || !cid) {
      return res.status(400).json({
        success: false,
        error: "Eksik parametre: 'proposalId' ve 'cid' alanları zorunludur."
      });
    }

    // Akıllı sözleşme örneğini al
    const contract = await ethers.getContractAt('PiPolicy', CONTRACT_ADDRESS);

    // İşlemi blokzincire gönder
    const tx = await contract.recordVoteResult(proposalId, cid);
    
    // İşlemin blokta onaylanmasını bekle
    const receipt = await tx.wait();

    return res.status(200).json({
      success: true,
      message: "Oylama sonucu başarıyla zincire kaydedildi.",
      txHash: tx.hash,
      blockNumber: receipt.blockNumber
    });

  } catch (error) {
    console.error("Blokzincir İşlem Hatası:", error);
    
    return res.status(500).json({
      success: false,
      error: "Blokzincir işlemi başarısız oldu.",
      details: error.message
    });
  }
});

module.exports = router;
