const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/', (req, res) => {
  try {
    const inputData = JSON.stringify(req.body);
    
    // Güvenli süreç başlatma (Shell enjeksiyonunu önlemek için spawn kullanılır)
    const pythonProcess = spawn('python3', ['ai-modules/riskScorer.py']);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python Süreç Hatası: ${stderrData}`);
        return res.status(500).json({
          success: false,
          error: 'AI modülü işleme sırasında hata oluştu.'
        });
      }

      try {
        // Python betiğinden gelen JSON çıktısını parse et
        const result = JSON.parse(stdoutData.trim());
        return res.status(200).json(result);
      } catch (parseError) {
        console.error('JSON Parse Hatası:', stdoutData);
        return res.status(500).json({
          success: false,
          error: 'AI modülü geçersiz yanıt formatı döndürdü.'
        });
      }
    });

    // Veriyi güvenli bir şekilde stdin üzerinden Python'a aktar
    pythonProcess.stdin.write(inputData);
    pythonProcess.stdin.end();

  } catch (error) {
    console.error('Risk Scorer Rota Hatası:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Sunucu içi bir hata oluştu.'
    });
  }
});

module.exports = router;
