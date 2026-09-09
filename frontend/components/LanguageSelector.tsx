import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className = '' }: LanguageSelectorProps): React.JSX.Element {
  const { i18n, t } = useTranslation();

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
    } catch (error) {
      console.error("Dil değiştirme hatası:", error);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        aria-label={t('selectLanguage', 'Dil Seçin')}
        value={i18n.language || 'tr'}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm transition-all cursor-pointer"
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
        <option value="de">Deutsch (B2)</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="zh">中文</option>
        <option value="ko">한국어</option>
        <option value="ar">العربية</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
}
