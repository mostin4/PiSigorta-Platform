import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        {/* ✅ Favicon burada */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        {/* 🌐 Manifest dosyası tanımı */}
        <link rel="manifest" href="/manifest.json" />

        {/* 📱 Mobil uyum için meta etiketi */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
