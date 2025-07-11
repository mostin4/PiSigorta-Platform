import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-800 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold text-indigo-700 mb-6 text-center">
        PiSigorta — Güvenliğinizi Merkezsizleştirin
      </h1>

      <p className="text-center max-w-xl mb-4 text-md md:text-lg">
        PiSigorta, Pi Network için özel olarak geliştirilmiş açık kaynaklı, çokdilli ve DAO destekli bir sigorta platformudur.
        Yapay zekâ ve blockchain teknolojileriyle desteklenir. Kodlarımız halka açıktır ve topluluğun gelişimine açıktır.
      </p>

      <div className="flex gap-4 flex-wrap justify-center mb-6">
        <Link href="https://github.com/mostin4/PiSigorta-Platform" target="_blank">
          <span className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700">
            🔗 GitHub Kaynak Kod
          </span>
        </Link>

        <Link href="/dao">
          <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500">
            🗳️ DAO Paneline Git
          </span>
        </Link>

        <Link href="/docs">
          <span className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500">
            📘 Proje Belgeleri
          </span>
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        PiSigorta, Pi Browser ve Pi Wallet ile uyumlu olacak şekilde tasarlanmıştır. Uygulama, IPFS, Snapshot ve PiChain entegrasyonlarıyla çalışır.
      </p>
    </div>
  );
}
