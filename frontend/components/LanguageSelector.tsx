import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="border p-2 rounded"
      defaultValue={i18n.language}
    >
      <option value="tr">Türkçe</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="zh">中文</option>
      <option value="ko">한국어</option>
      <option value="de">Deutsch</option>
      <option value="ar">العربية</option>
      <option value="ja">日本語</option>
    </select>
  );
}
