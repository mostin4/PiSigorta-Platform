const express = require('express');
const router = express.Router();
const { uploadToIPFS } = require('../ipfs/ipfsUpload');

router.post('/', async (req, res) => {
  const voteData = req.body; // { proposalId, votes }
  const cid = await uploadToIPFS(voteData);
  res.json({ success: true, cid });
});
