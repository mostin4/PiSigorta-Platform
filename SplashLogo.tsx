import { useTranslation } from 'react-i18next';

export default function SplashLogo() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/logo.svg" alt="Logo" className="w-28 h-28 mb-4" />
      <h1 className="text-xl font-bold text-indigo-800">
        {t('logoTitle')}
      </h1>
    </div>
  );
}
