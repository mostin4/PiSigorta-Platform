const fs = require('fs');

const readmeContent = `# 📌 PiSigorta - DAO Destekli Blockchain Sigorta Platformu

## 🇹🇷 Türkçe

**PiSigorta**, Pi Network üzerinde çalışan merkeziyetsiz bir sigorta platformudur. Yapay zeka ile desteklenmiş risk analizi, talep yönetimi ve DAO oylama sistemi içerir.

### Özellikler:
- Cüzdandaki Pi'ler için %100 sigorta
- DAO ile topluluk oylamasıyla yeni sigorta türleri
- Çokdilli destek: Türkçe, İngilizce, Fransızca, İspanyolca, Çince, Korece
- AI destekli risk analizi ve taleplerin değerlendirilmesi

## 🇬🇧 English

**PiSigorta** is a decentralized insurance platform built on the Pi Network. It uses AI for risk analysis, claim processing, and includes a DAO-based governance system.

### Features:
- 100% insurance for wallet Pi assets
- DAO voting for expanding coverage types
- Multilingual support: Turkish, English, French, Spanish, Chinese, Korean
- AI-powered risk scoring and claim evaluation

## 🇫🇷 Français

**PiSigorta** est une plateforme d’assurance décentralisée basée sur Pi Network. Elle utilise l’IA pour l’analyse des risques et la gestion des demandes, avec une gouvernance DAO.

### Fonctionnalités :
- Assurance à 100 % des Pi dans le portefeuille
- Vote communautaire DAO pour de nouvelles couvertures
- Support multilingue : Turc, Anglais, Français, Espagnol, Chinois, Coréen
- Analyse des risques et gestion des sinistres via IA

## 🇪🇸 Español

**PiSigorta** es una plataforma de seguros descentralizada en Pi Network. Usa IA para el análisis de riesgo y procesamiento de reclamaciones, con gobernanza por DAO.

### Funcionalidades:
- Seguro del 100 % de los Pi en la cartera
- Votación comunitaria DAO para nuevos tipos de seguros
- Soporte multilingüe: Turco, Inglés, Francés, Español, Chino, Coreano
- Evaluación de riesgos y reclamaciones con IA

## 🇨🇳 中文

**PiSigorta** 是一个构建于 Pi 网络上的去中心化保险平台。通过人工智能进行风险分析和索赔处理，并支持 DAO 治理系统。

### 功能特点：
- 钱包中的 Pi 全额保险
- DAO 投票扩展保险范围
- 多语言支持：土耳其语、英语、法语、西班牙语、中文、韩语
- AI 风险评分与索赔审核

## 🇰🇷 한국어

**PiSigorta**는 Pi Network 기반의 탈중앙화 보험 플랫폼입니다. AI를 활용한 리스크 분석 및 청구 처리와 DAO 거버넌스를 지원합니다.

### 주요 기능:
- 지갑 내 Pi 자산 100% 보장
- DAO 투표를 통한 보험 범위 확대
- 다국어 지원: 터키어, 영어, 프랑스어, 스페인어, 중국어, 한국어
- AI 기반 리스크 평가 및 청구 분석
`;

fs.writeFileSync('README.md', readmeContent, 'utf8');
console.log('README.md başarıyla oluşturuldu 🚀');
