import React from 'react';
import { useTranslation } from 'react-i18next';

interface SplashLogoProps {
  className?: string;
}

export default function SplashLogo({ className = '' }: SplashLogoProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div 
      className={`flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-100 to-white ${className}`}
      role="region"
      aria-label="Yükleme Ekranı"
    >
      <img 
        src="/logo.svg" 
        alt="Pi Sigorta Logo" 
        className="w-28 h-28 mb-4 animate-pulse select-none" 
        loading="eager"
      />
      <h1 className="text-xl font-bold text-indigo-800 tracking-wide">{t('logoTitle', 'Pi Sigorta')}</h1>
      <p className="text-sm text-gray-600 mt-2">{t('slogan', 'Güvenli Blokzincir Sigortası')}</p>
    </div>
  );
}
