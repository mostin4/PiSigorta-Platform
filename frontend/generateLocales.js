const fs = require('fs');
const path = require('path');

const sourceLang = 'tr'; // Başlangıç dili
const targetLangs = ['en', 'fr', 'es', 'zh', 'ko', 'de', 'ar', 'ja', 'it', 'pt'];
const sourceFile = path.join(__dirname, `../locale/${sourceLang}.json`);

if (!fs.existsSync(sourceFile)) {
  console.error('❌ Kaynak dil dosyası bulunamadı:', sourceFile);
  process.exit(1);
}

const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

targetLangs.forEach(lang => {
  const targetFile = path.join(__dirname, `../locale/${lang}.json`);
  if (fs.existsSync(targetFile)) {
    console.log(`⚠️ Dosya zaten var: ${targetFile}`);
    return;
  }

  const emptyTranslation = {};
  for (const key in sourceData) {
    emptyTranslation[key] = ""; // Otomatik çeviri entegrasyonu eklenebilir
  }

  fs.writeFileSync(targetFile, JSON.stringify(emptyTranslation, null, 2));
  console.log(`✅ ${lang}.json oluşturuldu`);
});
