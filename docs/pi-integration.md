# PiSigorta – Pi Network Teknik Entegrasyon Raporu

## 1. Akıllı Kontrat Uyumu
- **Dil:** Solidity
- **Yapı:** PiChain VM ile uyumlu, IPFS referanslı veri saklama
- **Dosya:** `smartcontracts/PiPolicy.sol`

## 2. Pi Wallet Entegrasyonu
- Prim ödeme ve tazminat transferleri için Pi Wallet API kullanımı önerilir.
- İşlem imzalama ve kullanıcı doğrulaması için Pi Wallet SDK entegrasyonu planlanmıştır.

## 3. DAO Yapısı
- Kullanıcılar stake ettikleri Pi miktarına göre oy gücüne sahiptir.
- Snapshot API ile uyumlu, çokdilli oylama arayüzü mevcuttur.

## 4. Veri Saklama – IPFS
- Poliçe dosyaları, talep belgeleri ve DAO sonuçları IPFS üzerinden CID ile saklanır.
- CID referansları kontratlara yazılır ve frontend'de görüntülenebilir.

## 5. Güvenlik & Uyum
- AI destekli dolandırıcılık tespiti
- Cüzdan erişim kaybı ve sözleşme hatalarına karşı teminat modülü

> Bu yapı Pi Network ile teknik olarak tam uyumlu çalışmaktadır.
