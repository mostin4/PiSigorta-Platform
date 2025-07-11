router.post('/', (req, res) => {
  const cidData = JSON.stringify(req.body);
  exec(`python3 ai-modules/voteAnalyzer.py '${cidData}'`, (err, stdout) => {
    if (err) return res.status(500).send('AI hatası');
    res.json({ trend: stdout.trim() });
  });
});
