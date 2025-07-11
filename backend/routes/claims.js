const express = require('express');
const router = express.Router();
const { uploadToIPFS } = require('../ipfs/ipfsUpload');

router.post('/', async (req, res) => {
  const claim = req.body;
  const cid = await uploadToIPFS(claim);
  res.json({ success: true, cid });
});

module.exports = router;
