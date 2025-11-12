import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(ctx) {
  // Use Next runtime locale if available
  const locale = (ctx?.__NEXT_DATA__ && ctx.__NEXT_DATA__.locale) || 'en';
  return (
    <Html lang={locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
