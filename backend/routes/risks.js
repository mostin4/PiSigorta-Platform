const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/', (req, res) => {
  const input = JSON.stringify(req.body);
  exec(`python3 ai-modules/riskScorer.py '${input}'`, (err, stdout) => {
    if (err) return res.status(500).send('AI error');
    res.json({ riskScore: parseFloat(stdout) });
  });
});

module.exports = router;
