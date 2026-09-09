import React from 'react';
import { useTranslation } from 'react-i18next';

interface SplashLogoProps {
  logoSrc?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function SplashLogo({ 
  logoSrc = '/logo.svg', 
  fullScreen = true, 
  className = '' 
}: SplashLogoProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col justify-center items-center ${fullScreen ? 'h-screen' : 'py-12'} bg-gradient-to-br from-indigo-100 to-white ${className}`}>
      <img 
        src={logoSrc} 
        alt={t('logoAlt', 'Pi Sigorta Logo')} 
        className="w-28 h-28 mb-4 animate-pulse drop-shadow-sm" 
      />
      <h1 className="text-xl font-bold text-indigo-800 tracking-tight">{t('logoTitle', 'Pi Sigorta Platform')}</h1>
      <p className="text-sm text-gray-600 mt-2 font-medium">{t('slogan', 'Merkeziyetsiz Sigorta ve Güvenlik')}</p>
    </div>
  );
}
