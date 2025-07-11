const express = require('express');
const router = express.Router();
const { ethers } = require('hardhat');

router.post('/', async (req, res) => {
  const { proposalId, cid } = req.body;

  const contract = await ethers.getContractAt('PiPolicy', contractAddress);
  const tx = await contract.recordVoteResult(proposalId, cid);
  await tx.wait();

  res.json({ success: true, txHash: tx.hash });
});
