import Link from 'next/link';
import Head from 'next/head';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>PiSigorta — Güvenliğinizi Merkezsizleştirin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-indigo-50 to-white text-gray-800">
        <h1 className="text-center text-2xl md:text-4xl font-bold text-indigo-700 mb-4">
          PiSigorta — Güvenliğinizi Merkezsizleştirin
        </h1>

        <p className="text-center text-sm md:text-base max-w-md mb-6">
          Pi Network topluluğu için geliştirilmiş açık kaynaklı, yapay zekâ destekli sigorta DApp’i.
          IPFS, DAO ve PiChain entegrasyonu ile tamamen merkeziyetsiz. Tüm kaynak kodlara GitHub üzerinden ulaşabilirsin.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center mb-6">
          <Link href="https://github.com/mostin4/PiSigorta-Platform" target="_blank">
            <span className="w-full px-4 py-2 bg-gray-800 text-white text-center rounded-md shadow hover:bg-gray-700 text-sm">
              🔗 GitHub Kaynak Kod
            </span>
          </Link>

          <Link href="/dao">
            <span className="w-full px-4 py-2 bg-indigo-600 text-white text-center rounded-md shadow hover:bg-indigo-500 text-sm">
              🗳️ DAO Paneli
            </span>
          </Link>

          <Link href="/docs">
            <span className="w-full px-4 py-2 bg-green-600 text-white text-center rounded-md shadow hover:bg-green-500 text-sm">
              📘 Proje Belgeleri
            </span>
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Bu DApp, Pi Browser ve Pi Wallet ile uyumlu çalışacak şekilde optimize edilmiştir. Mobil cihazlardan erişimde tam ekran desteği sunar.
        </p>
      </div>
    </>
  );
}
