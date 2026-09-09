const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/', (req, res) => {
  try {
    const cidData = JSON.stringify(req.body);
    
    // spawn kullanarak kabuk (shell) enjeksiyonu riskini engelliyoruz 
    // ve veriyi güvenli bir argüman dizisi olarak iletiyoruz
    const pythonProcess = spawn('python3', ['ai-modules/voteAnalyzer.py', cidData]);

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
        console.error(`Vote Analyzer Süreç Hatası: ${stderrData}`);
        return res.status(500).json({
          success: false,
          error: 'Oylama analizi sırasında hata oluştu.'
        });
      }

      try {
        // Python betiğinden gelen JSON yanıtını güvenle parse et
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

  } catch (error) {
    console.error('Vote Analyzer Rota Hatası:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Sunucu içi bir hata oluştu.'
    });
  }
});

module.exports = router;
