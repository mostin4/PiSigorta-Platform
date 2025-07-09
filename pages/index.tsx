import { useEffect, useState } from 'react';
import SplashLogo from '../components/SplashLogo';
import DaoPage from './dao'; // Gerçek içerik sayfası

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2500); // 2.5 saniyelik splash
    return () => clearTimeout(timer);
  }, []);

  return loaded ? <DaoPage /> : <SplashLogo />;
}
