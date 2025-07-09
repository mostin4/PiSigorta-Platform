const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const ipfsClient = require('ipfs-http-client');
const ai = require('./ai/riskScorer');

const app = express();
app.use(bodyParser.json());

const client = ipfsClient.create({ url: 'https://ipfs.infura.io:5001' });

// Sample endpoint: Risk analysis with AI and IPFS upload
app.post('/submitPolicy', async (req, res) => {
  const policy = req.body;
  const riskScore = await ai.calculateRiskScore(policy);

  const ipfsResult = await client.add(JSON.stringify({ ...policy, riskScore }));
  const cid = ipfsResult.path;

  // Here, call Pi smart contract using ethers.js
  // (Assuming wallet and contract setup completed)

  res.json({ success: true, cid, riskScore });
});

app.listen(5000, () => console.log('✅ Backend API running on port 5000'));
